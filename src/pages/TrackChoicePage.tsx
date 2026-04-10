import { useNavigate } from "react-router-dom";
import { useEntryDiagnosis } from "@/hooks/useEntryDiagnosis";
import { setLastTrack } from "@/providers/TrackProvider";
import type { Track } from "@/types/diagnosis";
import { Swords, Heart, ArrowRight, Sparkles, Star } from "lucide-react";

const tracks = [
  {
    id: "job" as Track,
    title: "ABILITY JOB",
    subtitle: "Business Quest",
    description:
      "スキルを磨き、キャリアを築く冒険。AI分析、ポートフォリオ、成長ロードマップで、あなたの仕事力を可視化します。",
    features: ["AIスキル分析", "ポートフォリオ", "スキル成長ログ", "週間レポート"],
    icon: Swords,
    accentColor: "text-gold",
    borderColor: "border-gold/60 hover:border-gold",
    bgGlow: "bg-gold/5",
    path: "/job/diagnosis",
  },
  {
    id: "love" as Track,
    title: "ABILITY LOVE",
    subtitle: "Love Quest",
    description:
      "魅力を解き放ち、運命の出会いを掴む冒険。個性心理學×恋愛心理学で、あなたの恋愛タイプと相性を可視化します。",
    features: ["恋愛タイプ診断", "相性マッチング", "魅力アップ", "恋愛ロードマップ"],
    icon: Heart,
    accentColor: "text-fire",
    borderColor: "border-fire/60 hover:border-fire",
    bgGlow: "bg-fire/5",
    path: "/love/diagnosis",
  },
] as const;

export function TrackChoicePage() {
  const navigate = useNavigate();
  const { state } = useEntryDiagnosis();

  const handleSelect = (track: Track, path: string) => {
    setLastTrack(track);
    navigate(path);
  };

  const result = state.quickResult;

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-2xl w-full mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <Sparkles className="w-10 h-10 text-gold mx-auto mb-3" />
          <h1 className="text-2xl md:text-3xl font-black text-gold text-glow">
            どちらの冒険に進む？
          </h1>
          <p className="text-text-secondary text-sm mt-2">
            あなたの目的に合わせて選んでください。あとから切り替えもできます。
          </p>
        </div>

        {/* Recommendation */}
        {result && (
          <div className="rpg-frame rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-bold">あなたのおすすめ</span>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gold">ビジネスの冒険</span>
                  <span className="text-gold font-bold">{result.jobScore}%</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full transition-all duration-700"
                    style={{ width: `${result.jobScore}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-fire">恋愛の冒険</span>
                  <span className="text-fire font-bold">{result.loveScore}%</span>
                </div>
                <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-fire/60 to-fire rounded-full transition-all duration-700"
                    style={{ width: `${result.loveScore}%` }}
                  />
                </div>
              </div>
            </div>
            {result.recommendation !== "balanced" && (
              <p className="text-text-secondary text-xs mt-3">
                {result.recommendation === "job"
                  ? "あなたはいま、ビジネスの冒険に気持ちが向いているようです"
                  : "あなたはいま、恋愛の冒険に気持ちが向いているようです"}
              </p>
            )}
            {result.recommendation === "balanced" && (
              <p className="text-text-secondary text-xs mt-3">
                どちらも同じくらい。気になった方から始めましょう
              </p>
            )}
          </div>
        )}

        {/* Track Cards */}
        <div className="space-y-4">
          {tracks.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id, t.path)}
                className={`w-full rpg-frame p-6 border-2 ${t.borderColor} ${t.bgGlow} transition-all text-left group cursor-pointer`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-bg-secondary ${t.accentColor}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className={`text-xl md:text-2xl font-black ${t.accentColor}`}>
                        {t.title}
                      </h2>
                    </div>
                    <p className="text-text-secondary text-xs mb-2">{t.subtitle}</p>
                    <p className="text-foreground text-sm mb-3 leading-relaxed">{t.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {t.features.map((f) => (
                        <span
                          key={f}
                          className="text-xs bg-bg-secondary text-text-secondary px-2 py-1 rounded-md border border-border-rpg/50"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight
                    className={`w-6 h-6 ${t.accentColor} flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-text-secondary text-xs mt-6">
          どちらも後から切り替えできます
        </p>
      </div>
    </div>
  );
}
