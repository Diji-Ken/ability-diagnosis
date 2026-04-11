import type {
  JobMatchResult,
  AnimalResult,
  NumerologyResult,
  CoreParams,
  Track,
} from "@/types/diagnosis";
import { JOB_TIER_LABELS } from "@/data/jobs";
import { calculateJobGap } from "@/lib/diagnosis/job-matcher";
import { RadarChart } from "@/components/chart/RadarChart";
import { ShareButtons } from "@/components/share/ShareButtons";
import {
  Star,
  TrendingUp,
  Swords,
  Heart,
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
  track: Track;
  paramLabels: Record<keyof CoreParams, string>;
  axisColors: Record<keyof CoreParams, string>;
  basePath: "/job" | "/love";
}

const SUB_PARAM_LABELS: Record<string, string> = {
  selfBranding: "セルフブランディング",
  execution: "実行力・スピード",
  learning: "学習・適応力",
  trust: "人間力・信頼構築",
  monetize: "マネタイズ力",
  direction: "ディレクション力",
};

const SUB_PARAM_LABELS_LOVE: Record<string, string> = {
  selfBranding: "魅力アピール",
  execution: "行動力・タイミング",
  learning: "共感・学び",
  trust: "信頼・安心感",
  monetize: "恋愛運",
  direction: "リード力",
};

export function JobResult({
  jobResult,
  animalResult,
  numerologyResult,
  onReset,
  track,
  paramLabels,
  axisColors,
  basePath,
}: JobResultProps) {
  const { primaryJob, matchScore, runnerUp, advancedJobs, coreParams, subParams } = jobResult;
  const isLove = track === "love";
  const accentText = isLove ? "text-fire" : "text-gold";
  const accentBg = isLove ? "bg-fire/10" : "bg-gold/10";
  const accentBorder = isLove ? "border-fire/20" : "border-gold/20";
  const accentBgLight = isLove ? "bg-fire/20" : "bg-gold/20";
  const accentHeaderIcon = isLove ? <Heart className="w-8 h-8 text-fire mx-auto mb-3" /> : <Swords className="w-8 h-8 text-gold mx-auto mb-3" />;
  const subLabels = isLove ? SUB_PARAM_LABELS_LOVE : SUB_PARAM_LABELS;
  const progressGradient = isLove
    ? "bg-gradient-to-r from-fire/40 to-fire"
    : "bg-gradient-to-r from-gold/40 to-gold";

  const axisKeys: (keyof CoreParams)[] = ["communication", "specialist", "marketing", "ai"];

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      {/* メインジョブ表示 */}
      <div className="text-center mb-6">
        {accentHeaderIcon}
        <p className="text-text-secondary text-sm mb-2">あなたのジョブは…</p>
        <h2 className={`text-3xl md:text-4xl font-black ${accentText} text-glow mb-1`}>
          {primaryJob.name}
        </h2>
        <p className="text-fire font-bold text-lg">{primaryJob.title}</p>
        <span className={`inline-block mt-2 px-3 py-1 ${accentBg} ${accentText} text-xs rounded-full border ${accentBorder}`}>
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
            <span className={`${accentText} font-bold text-lg`}>{primaryJob.mascot.name}</span>
            <span className="text-text-secondary text-xs ml-2">
              {primaryJob.mascot.animalMotif}モチーフ
            </span>
            <p className="text-text-secondary text-xs mt-1">{primaryJob.mascot.description}</p>
          </div>
        )}
        <p className="text-foreground text-sm leading-relaxed italic">
          &ldquo;{primaryJob.catchphrase}&rdquo;
        </p>
        <p className="text-text-secondary text-sm mt-3 leading-relaxed">{primaryJob.description}</p>
      </div>

      {/* レーダーチャート */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className={`${accentText} font-bold text-center mb-2`}>スキルパラメータ</h3>
        <RadarChart
          params={coreParams}
          labels={paramLabels}
          strokeColor={isLove ? "#ff6b9d" : "#ffd700"}
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          {axisKeys.map((axis) => (
            <ParamDisplay
              key={axis}
              label={paramLabels[axis]}
              value={coreParams[axis]}
              color={axisColors[axis]}
            />
          ))}
        </div>
      </div>

      {/* サブパラメータ */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className={`${accentText} font-bold mb-3`}>サブパラメータ</h3>
        <div className="space-y-2">
          {(Object.keys(subLabels) as (keyof typeof subParams)[]).map((key) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-text-secondary">{subLabels[key]}</span>
                <span className="text-foreground font-bold">{subParams[key]}</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${progressGradient} rounded-full transition-all duration-700`}
                  style={{ width: `${subParams[key]}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 上級ジョブへの道 */}
      {advancedJobs.length > 0 && (
        <div className="rpg-frame rounded-lg p-4 mb-4">
          <h3 className={`${accentText} font-bold mb-3 flex items-center gap-2`}>
            <TrendingUp className="w-5 h-5" />
            上級ジョブへの道
          </h3>
          {advancedJobs.map((advJob) => {
            const gap = calculateJobGap(coreParams, advJob);
            const firstSentence = advJob.description.split(/[。！!]/)[0] + "。";
            return (
              <Link
                key={advJob.id}
                to={`${basePath}/jobs/${advJob.id}`}
                className={`block bg-bg-secondary rounded-lg p-3 mb-2 last:mb-0 group hover:${accentBorder} border border-transparent transition-all`}
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
                      <ChevronRight className={`w-4 h-4 ${accentText}`} />
                      <span className={`${accentText} font-bold group-hover:underline`}>
                        {advJob.name}
                      </span>
                      <span className="text-text-secondary text-xs">({advJob.title})</span>
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
                  {axisKeys.map((axis) =>
                    gap[axis] > 0 ? (
                      <span key={axis} style={{ color: axisColors[axis] }}>
                        {paramLabels[axis]} +{gap[axis]}
                      </span>
                    ) : null,
                  )}
                </div>
                <p className={`${accentText} opacity-60 text-xs mt-2 group-hover:opacity-100 transition-colors text-right`}>
                  詳しいロードマップを見る →
                </p>
              </Link>
            );
          })}
        </div>
      )}

      {/* アクションプラン */}
      <div className="rpg-frame rounded-lg p-4 mb-4">
        <h3 className={`${accentText} font-bold mb-3 flex items-center gap-2`}>
          <Star className="w-5 h-5" />
          アクションプラン
        </h3>
        <ul className="space-y-2">
          {primaryJob.actionPlan.map((plan, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className={`w-5 h-5 ${accentBgLight} ${accentText} text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5`}>
                {i + 1}
              </span>
              <span className="text-foreground">{plan}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 次点ジョブ */}
      <div className="rpg-frame rounded-lg p-4 mb-6">
        <h3 className="text-text-secondary font-bold text-sm mb-2">次に近いジョブ</h3>
        <Link to={`${basePath}/jobs/${runnerUp.id}`} className="flex items-center gap-3 mb-2 group">
          <div className="w-16 h-16 relative shrink-0">
            <img
              src={runnerUp.imageUrl}
              alt={runnerUp.name}
              className="absolute inset-0 w-full h-full object-contain pixelated"
            />
          </div>
          <div>
            <p className={`text-foreground font-bold group-hover:${accentText} transition-colors`}>
              {runnerUp.name}{" "}
              <span className="text-text-secondary text-sm">({runnerUp.title})</span>
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
          const hasGap = axisKeys.some((a) => runnerUpGap[a] > 0);
          if (!hasGap) return null;
          return (
            <div>
              <p className="text-text-secondary text-xs mb-1">
                💡 このジョブに近づくためのヒント：
              </p>
              <div className="grid grid-cols-2 gap-1 text-xs">
                {axisKeys.map((axis) =>
                  runnerUpGap[axis] > 0 ? (
                    <span key={axis} style={{ color: axisColors[axis] }}>
                      {paramLabels[axis]} +{runnerUpGap[axis]}
                    </span>
                  ) : null,
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
        track={track}
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

function ParamDisplay({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-text-secondary truncate">{label}</span>
      <span className="ml-auto text-foreground font-bold">{value}</span>
    </div>
  );
}
