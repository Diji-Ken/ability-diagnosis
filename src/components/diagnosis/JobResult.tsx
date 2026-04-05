import type { JobMatchResult, AnimalResult, NumerologyResult, CoreParams } from "@/types/diagnosis";
import { JOB_TIER_LABELS } from "@/data/jobs";
import { calculateJobGap } from "@/lib/diagnosis/job-matcher";
import { RadarChart } from "@/components/chart/RadarChart";
import { ShareButtons } from "@/components/share/ShareButtons";
import {
  Star,
  TrendingUp,
  Swords,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

interface JobResultProps {
  jobResult: JobMatchResult;
  animalResult: AnimalResult;
  numerologyResult: NumerologyResult;
  onReset: () => void;
}

const SUB_PARAM_LABELS: Record<string, string> = {
  selfBranding: "セルフブランディング",
  execution: "実行力・スピード",
  learning: "学習・適応力",
  trust: "人間力・信頼構築",
  monetize: "マネタイズ力",
  direction: "ディレクション力",
};

export function JobResult({
  jobResult,
  animalResult,
  numerologyResult,
  onReset,
}: JobResultProps) {
  const { primaryJob, matchScore, runnerUp, advancedJobs, coreParams, subParams } =
    jobResult;

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      {/* メインジョブ表示 */}
      <div className="text-center mb-6">
        <Swords className="w-8 h-8 text-gold mx-auto mb-3" />
        <p className="text-text-secondary text-sm mb-2">あなたのジョブは…</p>
        <h2 className="text-3xl md:text-4xl font-black text-gold text-glow mb-1">
          {primaryJob.name}
        </h2>
        <p className="text-fire font-bold text-lg">{primaryJob.title}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
          {JOB_TIER_LABELS[primaryJob.tier]} ・ マッチ度 {matchScore}%
        </span>
      </div>

      {/* マスコット & ジョブ詳細 */}
      <div className="rpg-frame rounded-lg p-6 mb-4 text-center">
        <div className="w-44 h-44 mx-auto mb-4 relative">
          <img
            src={primaryJob.imageUrl}
            alt={primaryJob.mascot?.name || primaryJob.name}
            className="absolute inset-0 w-full h-full object-contain pixelated"
          />
        </div>
        {primaryJob.mascot && (
          <div className="mb-3">
            <span className="text-gold font-bold text-lg">
              {primaryJob.mascot.name}
            </span>
            <span className="text-text-secondary text-xs ml-2">
              {primaryJob.mascot.animalMotif}モチーフ
            </span>
            <p className="text-text-secondary text-xs mt-1">
              {primaryJob.mascot.description}
            </p>
          </div>
        )}
        <p className="text-foreground text-sm leading-relaxed italic">
          &ldquo;{primaryJob.catchphrase}&rdquo;
        </p>
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">
          {primaryJob.description}
        </p>
      </div>

      {/* レーダーチャート */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className="text-gold font-bold text-center mb-2">
          スキルパラメータ
        </h3>
        <RadarChart params={coreParams} />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <ParamDisplay label="コミュニケーション力" value={coreParams.communication} color="#4fc3f7" />
          <ParamDisplay label="専門スキル" value={coreParams.specialist} color="#ff6b35" />
          <ParamDisplay label="マーケティング力" value={coreParams.marketing} color="#66bb6a" />
          <ParamDisplay label="AIスキル" value={coreParams.ai} color="#ab47bc" />
        </div>
      </div>

      {/* サブパラメータ */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className="text-gold font-bold mb-3">サブパラメータ</h3>
        <div className="space-y-2">
          {(Object.keys(SUB_PARAM_LABELS) as (keyof typeof subParams)[]).map(
            (key) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-secondary">
                    {SUB_PARAM_LABELS[key]}
                  </span>
                  <span className="text-foreground font-bold">
                    {subParams[key]}
                  </span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold/40 to-gold rounded-full transition-all duration-700"
                    style={{ width: `${subParams[key]}%` }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* 上級ジョブへの道 */}
      {advancedJobs.length > 0 && (
        <div className="rpg-frame rounded-lg p-4 mb-4">
          <h3 className="text-gold font-bold mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            上級ジョブへの道
          </h3>
          {advancedJobs.map((advJob) => {
            const gap = calculateJobGap(coreParams, advJob);
            const firstSentence = advJob.description.split(/[。！!]/)[0] + "。";
            return (
              <Link
                key={advJob.id}
                to={`/jobs/${advJob.id}`}
                className="block bg-bg-secondary rounded-lg p-3 mb-2 last:mb-0 group hover:border-gold/30 border border-transparent transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-16 h-16 relative shrink-0">
                    <img
                      src={advJob.imageUrl}
                      alt={advJob.name}
                      className="absolute inset-0 w-full h-full object-contain pixelated"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gold" />
                      <span className="text-gold font-bold group-hover:underline">{advJob.name}</span>
                      <span className="text-text-secondary text-xs">
                        ({advJob.title})
                      </span>
                    </div>
                    <p className="text-text-secondary text-xs mt-1 italic">
                      &ldquo;{advJob.catchphrase}&rdquo;
                    </p>
                  </div>
                </div>
                <p className="text-text-secondary text-xs mb-2">
                  上級ジョブに到達するためのヒント：{firstSentence}
                </p>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {gap.communication > 0 && (
                    <span className="text-ice">
                      コミュニケーション力 +{gap.communication}
                    </span>
                  )}
                  {gap.specialist > 0 && (
                    <span className="text-fire">
                      専門スキル +{gap.specialist}
                    </span>
                  )}
                  {gap.marketing > 0 && (
                    <span className="text-nature">
                      マーケティング力 +{gap.marketing}
                    </span>
                  )}
                  {gap.ai > 0 && (
                    <span className="text-thunder">AIスキル +{gap.ai}</span>
                  )}
                </div>
                <p className="text-gold/60 text-xs mt-2 group-hover:text-gold transition-colors text-right">
                  詳しいロードマップを見る →
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* アクションプラン */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className="text-gold font-bold mb-3 flex items-center gap-2">
          <Star className="w-5 h-5" />
          アクションプラン
        </h3>
        <ul className="space-y-2">
          {primaryJob.actionPlan.map((plan, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 bg-gold/20 text-gold text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-foreground">{plan}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 次点ジョブ */}
      <div className="rpg-frame rounded-lg p-4 mb-6">
        <h3 className="text-text-secondary font-bold text-sm mb-2">
          次に近いジョブ
        </h3>
        <Link to={`/jobs/${runnerUp.id}`} className="flex items-center gap-3 mb-2 group">
          <div className="w-16 h-16 relative shrink-0">
            <img
              src={runnerUp.imageUrl}
              alt={runnerUp.name}
              className="absolute inset-0 w-full h-full object-contain pixelated"
            />
          </div>
          <div>
            <p className="text-foreground font-bold group-hover:text-gold transition-colors">
              {runnerUp.name}{" "}
              <span className="text-text-secondary text-sm">
                ({runnerUp.title})
              </span>
            </p>
            <p className="text-text-secondary text-xs mt-1 italic">
              &ldquo;{runnerUp.catchphrase}&rdquo;
            </p>
          </div>
        </Link>
        <p className="text-text-secondary text-xs mb-2">
          {runnerUp.description.length > 80
            ? runnerUp.description.slice(0, 80) + "..."
            : runnerUp.description}
        </p>
        {(() => {
          const runnerUpGap = calculateJobGap(coreParams, runnerUp);
          const hasGap =
            runnerUpGap.communication > 0 ||
            runnerUpGap.specialist > 0 ||
            runnerUpGap.marketing > 0 ||
            runnerUpGap.ai > 0;
          if (!hasGap) return null;
          return (
            <div>
              <p className="text-text-secondary text-xs mb-1">
                💡 このジョブに近づくためのヒント：
              </p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {runnerUpGap.communication > 0 && (
                  <span className="text-ice">
                    コミュニケーション力 +{runnerUpGap.communication}
                  </span>
                )}
                {runnerUpGap.specialist > 0 && (
                  <span className="text-fire">
                    専門スキル +{runnerUpGap.specialist}
                  </span>
                )}
                {runnerUpGap.marketing > 0 && (
                  <span className="text-nature">
                    マーケティング力 +{runnerUpGap.marketing}
                  </span>
                )}
                {runnerUpGap.ai > 0 && (
                  <span className="text-thunder">
                    AIスキル +{runnerUpGap.ai}
                  </span>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* シェアボタン */}
      <ShareButtons
        jobResult={jobResult}
        animalNumber={animalResult.number}
        lifePathNumber={numerologyResult.lifePath}
      />

      {/* もう一度診断 */}
      <div className="text-center mt-6">
        <Button variant="ghost" onClick={onReset} size="sm">
          <RotateCcw className="inline w-4 h-4 mr-1" />
          もう一度診断する
        </Button>
      </div>
    </div>
  );
}

function ParamDisplay({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-text-secondary">{label}</span>
      <span className="text-foreground font-bold ml-auto">{value}</span>
    </div>
  );
}
