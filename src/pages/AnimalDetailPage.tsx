import { useParams, Link } from "react-router-dom";
import { ANIMAL_CHARACTERS, ANIMAL_TRAITS } from "@/data/animals";
import { GROUP_DESCRIPTIONS, getGroup3 } from "@/lib/diagnosis/animal";
import { BackButton } from "@/components/ui/BackButton";
import { Sparkles, Briefcase, TrendingUp } from "lucide-react";

export function AnimalDetailPage() {
  const { animal } = useParams<{ animal: string }>();
  const decodedAnimal = animal ? decodeURIComponent(animal) : "";

  // Try to find by animal name
  const characters = ANIMAL_CHARACTERS.filter(
    (c) => c.animal === decodedAnimal
  );

  if (characters.length === 0) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-4">動物が見つかりませんでした</p>
          <Link to="/" className="text-gold hover:underline">
            トップへ戻る
          </Link>
        </div>
      </div>
    );
  }

  const traits = ANIMAL_TRAITS[decodedAnimal];
  const group = getGroup3(decodedAnimal);
  const groupInfo = GROUP_DESCRIPTIONS[group];

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="text-center mb-6">
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-1">
            {decodedAnimal}
          </h1>
          {groupInfo && (
            <div
              className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: `${groupInfo.color}20`,
                color: groupInfo.color,
                border: `1px solid ${groupInfo.color}40`,
              }}
            >
              {groupInfo.name}
            </div>
          )}
        </div>

        {/* Traits */}
        {traits && (
          <div className="rpg-frame rounded-lg p-6 mb-4">
            <h3 className="text-gold font-bold mb-3">強み</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {traits.strengths.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20"
                >
                  {s}
                </span>
              ))}
            </div>

            <h3 className="text-text-secondary font-bold mb-3">
              キャリア適性
            </h3>
            <div className="flex flex-wrap gap-2">
              {traits.careerHints.map((h) => (
                <span
                  key={h}
                  className="px-3 py-1 bg-bg-secondary text-text-secondary text-xs rounded-full border border-border-rpg/30"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Characters list */}
        <div className="rpg-frame rounded-lg p-6 mb-4">
          <h3 className="text-gold font-bold mb-4">
            {decodedAnimal}のキャラクター一覧
          </h3>
          <div className="space-y-3">
            {characters.map((char) => (
              <div
                key={char.number}
                className="bg-bg-secondary rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 bg-gold/20 text-gold text-xs font-bold rounded-full flex items-center justify-center shrink-0">
                    {char.number}
                  </span>
                  <span className="text-foreground font-bold">
                    {char.character}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {char.personality}
                </p>
                {char.workStyle && (
                  <div className="mt-2 pt-2 border-t border-border-rpg/20">
                    <p className="text-foreground text-xs flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3 text-gold" />
                      {char.workStyle}
                    </p>
                  </div>
                )}
                {char.growthAdvice && (
                  <div className="mt-1">
                    <p className="text-foreground text-xs flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-nature" />
                      {char.growthAdvice}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            to="/diagnosis"
            className="text-gold text-sm hover:underline"
          >
            診断に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
