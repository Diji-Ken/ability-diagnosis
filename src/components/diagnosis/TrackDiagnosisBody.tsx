import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { useEntryDiagnosis } from "@/hooks/useEntryDiagnosis";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { saveDiagnosisResult } from "@/lib/api/diagnosis";
import {
  recordActivity,
  EXP_REWARDS,
  getGamificationState,
  getLevelFromExp,
} from "@/lib/api/gamification";
import { checkRediagnosisEvolution, executeEvolution } from "@/lib/api/evolution";
import { SkillInventory } from "@/components/diagnosis/SkillInventory";
import { JobResult } from "@/components/diagnosis/JobResult";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { TrackConfig } from "@/types/diagnosis";

interface TrackDiagnosisBodyProps {
  config: TrackConfig;
}

export function TrackDiagnosisBody({ config }: TrackDiagnosisBodyProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { state: entryState, hydrated: entryHydrated } = useEntryDiagnosis();
  const savedRef = useRef(false);
  const prefilledRef = useRef(false);
  const [evolutionOffer, setEvolutionOffer] = useState<{
    jobName: string;
    jobId: string;
    fromJobId: string;
  } | null>(null);
  const [evolving, setEvolving] = useState(false);

  const {
    state,
    setOccupation,
    setSkillAnswer,
    submitSkills,
    reset,
    prefillFromEntry,
  } = useDiagnosis({
    track: config.track,
    jobs: config.jobs,
    categories: config.skillCategories,
  });

  // Prefill from entry diagnosis data if not already set (wait for hydration)
  useEffect(() => {
    if (!entryHydrated) return;
    if (prefilledRef.current) return;
    if (!state.animalResult && entryState.animalResult && entryState.birthday && entryState.numerologyResult) {
      prefillFromEntry({
        birthday: entryState.birthday,
        animalResult: entryState.animalResult,
        numerologyResult: entryState.numerologyResult,
      });
      prefilledRef.current = true;
    }
  }, [entryHydrated, entryState, state.animalResult, prefillFromEntry]);

  // If no entry data and no state, redirect to entry diagnosis (wait for hydration)
  useEffect(() => {
    if (!entryHydrated) return;
    if (prefilledRef.current) return;
    const hasEntry = entryState.animalResult && entryState.birthday;
    const hasState = state.animalResult && state.birthday;
    if (!hasEntry && !hasState) {
      navigate("/diagnosis");
    }
  }, [entryHydrated, entryState, state, navigate]);

  // Save to Supabase when diagnosis completes
  useEffect(() => {
    if (
      state.currentStep !== 3 ||
      !user ||
      !state.jobResult ||
      !state.animalResult ||
      !state.numerologyResult ||
      !state.birthday ||
      savedRef.current
    )
      return;

    savedRef.current = true;

    const birthday = `${state.birthday.year}-${String(state.birthday.month).padStart(2, "0")}-${String(state.birthday.day).padStart(2, "0")}`;

    saveDiagnosisResult({
      user_id: user.id,
      track: config.track,
      birthday,
      animal_number: state.animalResult.number,
      animal_name: state.animalResult.character,
      animal_group: state.animalResult.group,
      life_path_number: state.numerologyResult.lifePath,
      life_path_name: state.numerologyResult.name,
      occupation: state.occupation,
      skill_answers: state.skillAnswers,
      core_params: state.jobResult.coreParams,
      sub_params: state.jobResult.subParams,
      primary_job_id: state.jobResult.primaryJob.id,
      primary_job_name: state.jobResult.primaryJob.name,
      match_score: state.jobResult.matchScore,
      runner_up_job_id: state.jobResult.runnerUp?.id ?? null,
      runner_up_job_name: state.jobResult.runnerUp?.name ?? null,
    })
      .then(async (saveResult) => {
        if (!saveResult.data) return;

        const isFirst = saveResult.isFirst;
        const expReward = isFirst ? EXP_REWARDS.first_diagnosis : EXP_REWARDS.rediagnosis;

        await recordActivity(
          user.id,
          isFirst ? "first_diagnosis" : "rediagnosis",
          0,
          expReward,
          { version: saveResult.data.version },
          config.track,
        );

        if (isFirst) {
          await supabase
            .from("user_gamification")
            .update({
              current_job_id: state.jobResult!.primaryJob.id,
              job_tier: state.jobResult!.primaryJob.tier,
            })
            .eq("user_id", user.id)
            .eq("track", config.track);
        }

        if (!isFirst) {
          const { data: gamState } = await getGamificationState(user.id, config.track);
          if (gamState?.current_job_id) {
            const levelInfo = getLevelFromExp(gamState.total_exp + expReward);
            const evolution = checkRediagnosisEvolution(
              gamState.current_job_id,
              state.jobResult!.primaryJob.id,
              levelInfo.level,
              config.track,
            );
            if (evolution) {
              setEvolutionOffer({
                jobName: evolution.job.name,
                jobId: evolution.job.id,
                fromJobId: gamState.current_job_id,
              });
            }
          }
        }
      })
      .catch(console.error);
  }, [
    state.currentStep,
    user,
    state.jobResult,
    state.animalResult,
    state.numerologyResult,
    state.birthday,
    state.occupation,
    state.skillAnswers,
    config.track,
  ]);

  const handleEvolution = async () => {
    if (!user || !evolutionOffer) return;
    setEvolving(true);
    await executeEvolution(
      user.id,
      evolutionOffer.fromJobId,
      evolutionOffer.jobId,
      "rediagnosis",
      config.track,
    );
    setEvolving(false);
    setEvolutionOffer(null);
  };

  const handleReset = () => {
    savedRef.current = false;
    prefilledRef.current = false;
    setEvolutionOffer(null);
    reset();
    navigate("/diagnosis");
  };

  const stepTitle = config.track === "love" ? "STEP: 恋愛スキル棚卸し" : "STEP: スキル棚卸し";
  const stepSubtitle =
    config.track === "love"
      ? "あなたの現在の恋愛スキルを教えてください"
      : "あなたの現在のスキルを教えてください";
  const submitLabel =
    config.track === "love" ? "恋愛ジョブを診断する" : "ジョブを診断する";
  const occupationLabel =
    config.track === "love" ? "あなたの現状を選択してください" : "現在の職種を選択してください";
  const accentText = config.track === "love" ? "text-fire" : "text-gold";

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/diagnosis"
            className="flex items-center gap-1 text-text-secondary text-xs hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            入口診断へ戻る
          </Link>
          <h1 className={`${accentText} font-bold text-lg`}>{config.productName}</h1>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="mb-10">
          <ProgressBar
            currentStep={state.currentStep >= 2 ? (state.currentStep === 2 ? 1 : 2) : 1}
            totalSteps={2}
            labels={["スキル棚卸し", "ジョブ判定"]}
          />
        </div>

        {/* Step 2: Skill Inventory */}
        {state.currentStep <= 2 && (
          <SkillInventory
            categories={config.skillCategories}
            occupations={config.occupations}
            skillAnswers={state.skillAnswers}
            occupation={state.occupation}
            onSetOccupation={setOccupation}
            onSetSkillAnswer={setSkillAnswer}
            onSubmit={submitSkills}
            themeAccent={config.themeAccent}
            stepTitle={stepTitle}
            stepSubtitle={stepSubtitle}
            submitLabel={submitLabel}
            occupationLabel={occupationLabel}
          />
        )}

        {/* Step 3: Job Result */}
        {state.currentStep === 3 &&
          state.jobResult &&
          state.animalResult &&
          state.numerologyResult && (
            <>
              <JobResult
                jobResult={state.jobResult}
                animalResult={state.animalResult}
                numerologyResult={state.numerologyResult}
                onReset={handleReset}
                track={config.track}
                paramLabels={config.paramLabels}
                axisColors={config.axisColors}
                basePath={config.basePath}
              />

              {/* Evolution Offer */}
              {evolutionOffer && (
                <div className="mt-6 rpg-frame p-6 border-2 border-yellow-500/50 bg-yellow-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-lg font-bold text-yellow-400">進化可能！</h3>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    再診断の結果、上位ジョブ「
                    <span className="text-gold font-bold">{evolutionOffer.jobName}</span>
                    」にマッチしました。転職しますか？
                  </p>
                  <button
                    onClick={handleEvolution}
                    disabled={evolving}
                    className="rpg-button flex items-center gap-2 px-6"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {evolving ? "転職中..." : `${evolutionOffer.jobName}に転職する`}
                  </button>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 text-center space-y-3">
                {user ? (
                  <Link
                    to={`${config.basePath}/dashboard`}
                    className="rpg-button inline-block px-8 py-3 text-lg font-bold"
                  >
                    ダッシュボードへ
                  </Link>
                ) : (
                  <div className="rpg-frame p-6">
                    <p className="text-text-secondary text-sm mb-3">
                      アカウントを作成して結果を保存しましょう
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Link to="/signup" className="rpg-button px-6 py-2 text-sm font-bold">
                        冒険者登録
                      </Link>
                      <Link to="/login" className="text-gold hover:underline text-sm py-2">
                        ログイン
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
      </div>
    </div>
  );
}
