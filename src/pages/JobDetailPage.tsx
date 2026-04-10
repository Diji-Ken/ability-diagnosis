import { useParams, Link } from "react-router-dom";
import { JOB_TIER_LABELS } from "@/data/jobs";
import { useTrack } from "@/providers/TrackProvider";
import { useTrackJobs } from "@/hooks/useTrackJobs";
import { BackButton } from "@/components/ui/BackButton";
import { Swords, Star, TrendingUp, ChevronRight } from "lucide-react";

export function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { basePath } = useTrack();
  const jobs = useTrackJobs();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">ジョブが見つかりませんでした</p>
          <Link to={`${basePath}/dashboard`} className="text-gold hover:underline">
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const advancedJobs = job.advancedJobs
    .map((ajId) => jobs.find((j) => j.id === ajId))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Job Header */}
        <div className="text-center mb-6">
          <Swords className="w-8 h-8 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-1">
            {job.name}
          </h1>
          <p className="text-fire font-bold text-lg">{job.title}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
            {JOB_TIER_LABELS[job.tier]}
          </span>
        </div>

        {/* Mascot & Description */}
        <div className="rpg-frame rounded-lg p-6 mb-4 text-center">
          <div className="w-44 h-44 mx-auto mb-4 relative">
            <img
              src={job.imageUrl}
              alt={job.mascot?.name || job.name}
              className="absolute inset-0 w-full h-full object-contain pixelated"
            />
          </div>
          {job.mascot && (
            <div className="mb-3">
              <span className="text-gold font-bold text-lg">
                {job.mascot.name}
              </span>
              <span className="text-text-secondary text-xs ml-2">
                {job.mascot.animalMotif}モチーフ
              </span>
              <p className="text-text-secondary text-xs mt-1">
                {job.mascot.description}
              </p>
            </div>
          )}
          <p className="text-foreground text-sm leading-relaxed italic">
            &ldquo;{job.catchphrase}&rdquo;
          </p>
          <p className="text-text-secondary text-sm mt-3 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Required Params */}
        <div className="rpg-frame rounded-lg p-4 mb-4">
          <h3 className="text-gold font-bold mb-3">必要パラメータ</h3>
          <div className="space-y-2">
            <ParamBar label="コミュニケーション力" value={job.requiredParams.communication} color="#4fc3f7" />
            <ParamBar label="専門スキル" value={job.requiredParams.specialist} color="#ff6b35" />
            <ParamBar label="マーケティング力" value={job.requiredParams.marketing} color="#66bb6a" />
            <ParamBar label="AIスキル" value={job.requiredParams.ai} color="#ab47bc" />
          </div>
        </div>

        {/* Action Plan */}
        <div className="rpg-frame rounded-lg p-4 mb-4">
          <h3 className="text-gold font-bold mb-3 flex items-center gap-2">
            <Star className="w-5 h-5" />
            アクションプラン
          </h3>
          <ul className="space-y-2">
            {job.actionPlan.map((plan, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="w-5 h-5 bg-gold/20 text-gold text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-foreground">{plan}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Advanced Jobs */}
        {advancedJobs.length > 0 && (
          <div className="rpg-frame rounded-lg p-4 mb-4">
            <h3 className="text-gold font-bold mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              上級ジョブへの道
            </h3>
            {advancedJobs.map((advJob) => {
              if (!advJob) return null;
              return (
                <Link
                  key={advJob.id}
                  to={`${basePath}/jobs/${advJob.id}`}
                  className="block bg-bg-secondary rounded-lg p-3 mb-2 last:mb-0 group hover:border-gold/30 border border-transparent transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative shrink-0">
                      <img
                        src={advJob.imageUrl}
                        alt={advJob.name}
                        className="absolute inset-0 w-full h-full object-contain pixelated"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-gold" />
                        <span className="text-gold font-bold group-hover:underline">
                          {advJob.name}
                        </span>
                      </div>
                      <p className="text-text-secondary text-xs mt-1">
                        {advJob.title}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Back to dashboard */}
        <div className="text-center mt-8">
          <Link
            to={`${basePath}/dashboard`}
            className="text-gold text-sm hover:underline"
          >
            ダッシュボードへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}

function ParamBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-secondary">{label}</span>
        <span className="text-foreground font-bold">{value}</span>
      </div>
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
