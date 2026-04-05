import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDiagnosis } from "@/hooks/useDiagnosis";
import { useAuth } from "@/providers/AuthProvider";
import { useMode } from "@/providers/ModeProvider";
import { saveDiagnosisResult } from "@/lib/api/diagnosis";
import { recordActivity, EXP_REWARDS, getGamificationState, getLevelFromExp } from "@/lib/api/gamification";
import { checkRediagnosisEvolution, executeEvolution } from "@/lib/api/evolution";
import { BirthdayInput } from "@/components/diagnosis/BirthdayInput";
import { NatureResult } from "@/components/diagnosis/NatureResult";
import { SkillInventory } from "@/components/diagnosis/SkillInventory";
import { JobResult } from "@/components/diagnosis/JobResult";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft, Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

export function DiagnosisPage() {
  const { user } = useAuth();
  const { hasSelectedMode } = useMode();
  const savedRef = useRef(false);
  const [evolutionOffer, setEvolutionOffer] = useState<{ jobName: string; jobId: string; fromJobId: string } | null>(null);
  const [evolving, setEvolving] = useState(false);
  const {
    state,
    submitBirthday,
    goToStep2,
    setOccupation,
    setSkillAnswer,
    submitSkills,
    reset,
  } = useDiagnosis();

  // Save to Supabase when diagnosis completes and user is logged in
  useEffect(() => {
    if (
      state.currentStep !== 3 ||
      !user ||
      !state.jobResult ||
      !state.animalResult ||
      !state.numerologyResult ||
      !state.birthday ||
      savedRef.current
    ) return;

    savedRef.current = true;

    const birthday = `${state.birthday.year}-${String(state.birthday.month).padStart(2, "0")}-${String(state.birthday.day).padStart(2, "0")}`;

    saveDiagnosisResult({
      user_id: user.id,
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
    }).then(async (saveResult) => {
      if (!saveResult.data) return;

      const isFirst = saveResult.isFirst;
      const expReward = isFirst ? EXP_REWARDS.first_diagnosis : EXP_REWARDS.rediagnosis;

      // EXP only, no points for diagnosis
      await recordActivity(user.id, isFirst ? "first_diagnosis" : "rediagnosis", 0, expReward, {
        version: saveResult.data.version,
      });

      // Set current_job_id on first diagnosis
      if (isFirst) {
        await supabase
          .from("user_gamification")
          .update({
            current_job_id: state.jobResult!.primaryJob.id,
            job_tier: state.jobResult!.primaryJob.tier,
          })
          .eq("user_id", user.id);
      }

      // Check for re-diagnosis evolution (Trigger B)
      if (!isFirst) {
        const { data: gamState } = await getGamificationState(user.id);
        if (gamState?.current_job_id) {
          const levelInfo = getLevelFromExp(gamState.total_exp + expReward);
          const evolution = checkRediagnosisEvolution(
            gamState.current_job_id,
            state.jobResult!.primaryJob.id,
            levelInfo.level
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
    }).catch(console.error);
  }, [state.currentStep, user, state.jobResult, state.animalResult, state.numerologyResult, state.birthday, state.occupation, state.skillAnswers]);

  const handleEvolution = async () => {
    if (!user || !evolutionOffer) return;
    setEvolving(true);
    await executeEvolution(user.id, evolutionOffer.fromJobId, evolutionOffer.jobId, "rediagnosis");
    setEvolving(false);
    setEvolutionOffer(null);
  };

  const handleReset = () => {
    savedRef.current = false;
    setEvolutionOffer(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-1 text-text-secondary text-xs hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {user ? "ダッシュボード" : "トップへ戻る"}
          </Link>
          <h1 className="text-gold font-bold text-lg">ABILITY JOB DIAGNOSIS</h1>
          <div className="w-20" />
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <ProgressBar
            currentStep={state.currentStep}
            totalSteps={3}
            labels={["性質診断", "スキル棚卸し", "ジョブ判定"]}
          />
        </div>

        {/* Step Content */}
        {state.currentStep === 1 && !state.animalResult && (
          <BirthdayInput onSubmit={submitBirthday} />
        )}

        {state.currentStep === 1 && state.animalResult && state.numerologyResult && (
          <NatureResult
            animalResult={state.animalResult}
            numerologyResult={state.numerologyResult}
            onNext={goToStep2}
          />
        )}

        {state.currentStep === 2 && (
          <SkillInventory
            skillAnswers={state.skillAnswers}
            occupation={state.occupation}
            onSetOccupation={setOccupation}
            onSetSkillAnswer={setSkillAnswer}
            onSubmit={submitSkills}
          />
        )}

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
              />

              {/* Evolution Offer (Trigger B: re-diagnosis) */}
              {evolutionOffer && (
                <div className="mt-6 rpg-frame p-6 border-2 border-yellow-500/50 bg-yellow-500/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h3 className="text-lg font-bold text-yellow-400">進化可能！</h3>
                  </div>
                  <p className="text-text-secondary text-sm mb-4">
                    再診断の結果、上位ジョブ「<span className="text-gold font-bold">{evolutionOffer.jobName}</span>」にマッチしました。転職しますか？
                  </p>
                  <button
                    onClick={handleEvolution}
                    disabled={evolving}
                    className="rpg-button flex items-center gap-2 px-6"
                  >
                    <ArrowRight className="w-4 h-4" />
                    {evolving ? "転職中..." : `${evolutionOffer.jobName}に転職する`}
                  </button>
                  <p className="text-xs text-text-secondary mt-2">
                    転職すると +1,000 EXP +200 pt を獲得します
                  </p>
                </div>
              )}

              {/* Post-diagnosis CTA */}
              <div className="mt-8 text-center space-y-3">
                {user ? (
                  <Link
                    to={hasSelectedMode ? "/dashboard" : "/mode-select"}
                    className="rpg-button inline-block px-8 py-3 text-lg font-bold"
                  >
                    {hasSelectedMode ? "ダッシュボードへ" : "冒険モードを選ぶ"}
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
