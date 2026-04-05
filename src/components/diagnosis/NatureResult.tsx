import type { AnimalResult, NumerologyResult } from "@/types/diagnosis";
import { GROUP_DESCRIPTIONS } from "@/lib/diagnosis/animal";
import { Button } from "@/components/ui/Button";
import { Sparkles, Star, ArrowRight, Briefcase, TrendingUp } from "lucide-react";

interface NatureResultProps {
  animalResult: AnimalResult;
  numerologyResult: NumerologyResult;
  onNext: () => void;
}

export function NatureResult({
  animalResult,
  numerologyResult,
  onNext,
}: NatureResultProps) {
  const groupInfo = GROUP_DESCRIPTIONS[animalResult.group];

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Sparkles className="w-8 h-8 text-gold mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gold mb-2">
          あなたの生まれ持った性質
        </h2>
        <p className="text-text-secondary text-sm">
          個性心理学 × 数秘術の結果
        </p>
      </div>

      {/* 動物占い結果 */}
      <div className="rpg-frame rounded-lg p-6 mb-4">
        <div className="text-center mb-4">
          <div className="text-6xl mb-3">
            {getAnimalEmoji(animalResult.animal)}
          </div>
          <h3 className="text-xl font-bold text-gold">
            {animalResult.character}
          </h3>
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
          <p className="text-text-secondary text-xs mt-1">
            {groupInfo.description}
          </p>
        </div>

        {/* 詳細な性格分析 */}
        <p className="text-foreground text-sm leading-relaxed mb-4">
          {animalResult.detailedPersonality || animalResult.personality}
        </p>

        {/* 仕事スタイル */}
        {animalResult.workStyle && (
          <div className="bg-bg-secondary rounded-lg p-3 mb-4">
            <h4 className="text-gold text-sm font-bold mb-1 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              仕事のスタイル
            </h4>
            <p className="text-foreground text-xs leading-relaxed">
              {animalResult.workStyle}
            </p>
          </div>
        )}

        {/* 成長アドバイス */}
        {animalResult.growthAdvice && (
          <div className="bg-bg-secondary rounded-lg p-3 mb-4">
            <h4 className="text-nature text-sm font-bold mb-1 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              成長のヒント
            </h4>
            <p className="text-foreground text-xs leading-relaxed">
              {animalResult.growthAdvice}
            </p>
          </div>
        )}

        <div className="mb-3">
          <h4 className="text-gold text-sm font-bold mb-2">強み</h4>
          <div className="flex flex-wrap gap-2">
            {animalResult.strengths.map((s) => (
              <span
                key={s}
                className="px-3 py-1 bg-gold/10 text-gold text-xs rounded-full border border-gold/20"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-text-secondary text-sm font-bold mb-2">
            キャリア適性
          </h4>
          <div className="flex flex-wrap gap-2">
            {animalResult.careerHints.map((h) => (
              <span
                key={h}
                className="px-3 py-1 bg-bg-secondary text-text-secondary text-xs rounded-full border border-border-rpg/30"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 数秘術結果 */}
      <div className="rpg-frame rounded-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-thunder/20 border-2 border-thunder flex items-center justify-center">
            <span className="text-thunder font-black text-xl">
              {numerologyResult.lifePath}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">
              ライフパスナンバー {numerologyResult.lifePath}
            </h3>
            <p className="text-thunder text-sm font-bold">
              「{numerologyResult.name}」
            </p>
          </div>
        </div>

        <p className="text-foreground text-sm leading-relaxed mb-3">
          {numerologyResult.description}
        </p>

        <div>
          <h4 className="text-text-secondary text-sm font-bold mb-2">
            キャリア特性
          </h4>
          <ul className="space-y-1">
            {numerologyResult.careerTraits.map((trait) => (
              <li
                key={trait}
                className="text-text-secondary text-sm flex items-start gap-2"
              >
                <Star className="w-3 h-3 text-thunder mt-1 shrink-0" />
                {trait}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Next Step */}
      <Button onClick={onNext} className="w-full" size="lg">
        スキル診断へ進む <ArrowRight className="inline w-5 h-5 ml-1" />
      </Button>

      <p className="text-text-secondary text-xs text-center mt-3">
        スキルを入力すると、あなたのジョブが判明します
      </p>
    </div>
  );
}

function getAnimalEmoji(animal: string): string {
  const emojiMap: Record<string, string> = {
    チータ: "🐆",
    ひつじ: "🐏",
    ペガサス: "🦄",
    ゾウ: "🐘",
    ライオン: "🦁",
    こじか: "🦌",
    たぬき: "🦝",
    コアラ: "🐨",
    黒ひょう: "🐈‍⬛",
    猿: "🐵",
    狼: "🐺",
    虎: "🐯",
  };
  return emojiMap[animal] || "✨";
}
