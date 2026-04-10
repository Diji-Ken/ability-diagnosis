import { useParams, Link } from "react-router-dom";
import { decodeShareData } from "@/lib/share";
import { getTrackConfig } from "@/config/trackConfig";
import { ANIMAL_CHARACTERS } from "@/data/animals";
import { RadarChart } from "@/components/chart/RadarChart";
import { Swords, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { CoreParams, Track } from "@/types/diagnosis";

export function SharePage() {
  const { track, id } = useParams<{ track: string; id: string }>();

  if (!id) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">シェアデータが見つかりませんでした</p>
      </div>
    );
  }

  const trackKey: Track = track === 'love' ? 'love' : 'job';
  const trackConfig = getTrackConfig(trackKey);
  const shareData = decodeShareData(id);

  if (!shareData) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">無効なシェアリンクです</p>
          <Link to="/" className="text-gold hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const job = trackConfig.jobs.find((j) => j.id === shareData.j);
  const animalChar = ANIMAL_CHARACTERS.find((a) => a.number === shareData.a);
  const coreParams: CoreParams = {
    communication: shareData.p[0],
    specialist: shareData.p[1],
    marketing: shareData.p[2],
    ai: shareData.p[3],
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">ジョブが見つかりませんでした</p>
          <Link to="/" className="text-gold hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <Swords className="w-8 h-8 text-gold mx-auto mb-3" />
          <p className="text-text-secondary text-sm mb-2">この人のジョブは…</p>
          <h1 className="text-3xl font-black text-gold text-glow mb-1">
            {job.name}
          </h1>
          <p className="text-fire font-bold text-lg">{job.title}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20">
            マッチ度 {shareData.s}%
          </span>
        </div>

        {/* Mascot */}
        <div className="rpg-frame rounded-lg p-6 mb-4 text-center">
          <div className="w-44 h-44 mx-auto mb-4 relative">
            <img
              src={job.imageUrl}
              alt={job.mascot?.name || job.name}
              className="absolute inset-0 w-full h-full object-contain pixelated"
            />
          </div>
          <p className="text-foreground text-sm leading-relaxed italic">
            &ldquo;{job.catchphrase}&rdquo;
          </p>
        </div>

        {/* Radar Chart */}
        <div className="rpg-frame rounded-lg p-4 mb-4">
          <h3 className="text-gold font-bold text-center mb-2">
            スキルパラメータ
          </h3>
          <RadarChart params={coreParams} />
        </div>

        {/* Animal */}
        {animalChar && (
          <div className="rpg-frame rounded-lg p-4 mb-6">
            <h3 className="text-gold font-bold text-center mb-2">
              性質タイプ
            </h3>
            <p className="text-foreground text-center text-lg font-bold">
              {animalChar.character}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center">
          <p className="text-text-secondary text-sm mb-4">
            あなたも診断してみませんか？
          </p>
          <Link to="/diagnosis">
            <Button size="lg">
              自分のジョブを診断する <ArrowRight className="inline w-5 h-5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
