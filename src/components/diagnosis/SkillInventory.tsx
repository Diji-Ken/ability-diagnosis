import { useState } from "react";
import { SKILL_CATEGORIES, OCCUPATIONS } from "@/data/skills";
import { Button } from "@/components/ui/Button";
import {
  Wrench,
  MessageCircle,
  TrendingUp,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface SkillInventoryProps {
  skillAnswers: Record<string, number>;
  occupation: string | null;
  onSetOccupation: (occupation: string) => void;
  onSetSkillAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

const AXIS_COLORS: Record<string, string> = {
  communication: "text-ice",
  specialist: "text-fire",
  marketing: "text-nature",
  ai: "text-thunder",
};

export function SkillInventory({
  skillAnswers,
  occupation,
  onSetOccupation,
  onSetSkillAnswer,
  onSubmit,
}: SkillInventoryProps) {
  const [currentCategory, setCurrentCategory] = useState(0);
  // 選択肢のインデックスを記録（同一valueの選択肢が複数ある場合のUI表示用）
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<Record<string, number>>({});

  const totalQuestions = SKILL_CATEGORIES.reduce(
    (acc, cat) => acc + cat.questions.length,
    0
  );
  const answeredQuestions = Object.keys(skillAnswers).length;
  const allAnswered = answeredQuestions >= totalQuestions && occupation;

  const category = SKILL_CATEGORIES[currentCategory];

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Wrench className="w-8 h-8 text-fire mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-gold mb-2">
          STEP 2: スキル棚卸し
        </h2>
        <p className="text-text-secondary text-sm">
          あなたの現在のスキルを教えてください
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>
            回答済み: {answeredQuestions}/{totalQuestions}
          </span>
          <span>
            {Math.round((answeredQuestions / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-fire/60 to-fire rounded-full transition-all duration-500"
            style={{
              width: `${(answeredQuestions / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 職種選択（最初だけ表示） */}
      {!occupation && (
        <div className="rpg-frame rounded-lg p-6 mb-6">
          <h3 className="text-gold font-bold mb-3">
            現在の職種を選択してください
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {OCCUPATIONS.map((occ) => (
              <button
                key={occ.id}
                onClick={() => onSetOccupation(occ.id)}
                className="px-3 py-2 text-sm rounded-lg border border-border-rpg bg-bg-secondary text-foreground hover:border-gold hover:bg-gold/10 transition-all cursor-pointer text-left"
              >
                {occ.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* スキル質問 */}
      {occupation && (
        <>
          {/* カテゴリータブ */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {SKILL_CATEGORIES.map((cat, i) => {
              const catAnswered = cat.questions.filter(
                (q) => skillAnswers[q.id] !== undefined
              ).length;
              const isComplete = catAnswered === cat.questions.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategory(i)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    i === currentCategory
                      ? "bg-gold/20 text-gold border border-gold/40"
                      : isComplete
                        ? "bg-nature/10 text-nature border border-nature/30"
                        : "bg-bg-card text-text-secondary border border-border-rpg/30 hover:border-border-rpg"
                  }`}
                >
                  <span className={AXIS_COLORS[cat.id]}>
                    {ICON_MAP[cat.icon]}
                  </span>
                  {cat.label.replace("スキル", "")}
                  {isComplete && " ✓"}
                </button>
              );
            })}
          </div>

          {/* 質問一覧 */}
          <div className="space-y-4 mb-6">
            {category.questions.map((question) => (
              <div key={question.id} className="rpg-frame rounded-lg p-4">
                <p className="text-foreground text-sm font-bold mb-3">
                  {question.text}
                </p>
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        onSetSkillAnswer(question.id, option.value);
                        setSelectedOptionIndex((prev) => ({ ...prev, [question.id]: optIdx }));
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer border ${
                        selectedOptionIndex[question.id] === optIdx
                          ? "bg-gold/15 border-gold text-gold"
                          : "bg-bg-secondary border-border-rpg/30 text-foreground hover:border-border-rpg"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ナビゲーション */}
          <div className="flex gap-3">
            {currentCategory > 0 && (
              <Button
                variant="secondary"
                onClick={() => setCurrentCategory((c) => c - 1)}
                className="flex-1"
              >
                前へ
              </Button>
            )}
            {currentCategory < SKILL_CATEGORIES.length - 1 ? (
              <Button
                onClick={() => setCurrentCategory((c) => c + 1)}
                className="flex-1"
              >
                次のカテゴリー <ArrowRight className="inline w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={onSubmit}
                disabled={!allAnswered}
                className="flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                size="lg"
              >
                ジョブを診断する
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
