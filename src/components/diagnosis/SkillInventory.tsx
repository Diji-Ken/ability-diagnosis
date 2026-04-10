import { useState } from "react";
import type { SkillCategory, Occupation } from "@/types/diagnosis";
import { Button } from "@/components/ui/Button";
import {
  Wrench,
  MessageCircle,
  TrendingUp,
  Sparkles,
  Heart,
  Zap,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

interface SkillInventoryProps {
  categories: SkillCategory[];
  occupations: Occupation[];
  skillAnswers: Record<string, number>;
  occupation: string | null;
  onSetOccupation: (occupation: string) => void;
  onSetSkillAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
  themeAccent?: "gold" | "fire";
  stepTitle?: string;
  stepSubtitle?: string;
  submitLabel?: string;
  occupationLabel?: string;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Heart: <Heart className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
};

const AXIS_COLORS: Record<string, string> = {
  communication: "text-ice",
  specialist: "text-fire",
  marketing: "text-nature",
  ai: "text-thunder",
};

export function SkillInventory({
  categories,
  occupations,
  skillAnswers,
  occupation,
  onSetOccupation,
  onSetSkillAnswer,
  onSubmit,
  themeAccent = "gold",
  stepTitle = "STEP 2: スキル棚卸し",
  stepSubtitle = "あなたの現在のスキルを教えてください",
  submitLabel = "ジョブを診断する",
  occupationLabel = "現在の職種を選択してください",
}: SkillInventoryProps) {
  const [currentCategory, setCurrentCategory] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<Record<string, number>>({});

  const totalQuestions = categories.reduce(
    (acc, cat) => acc + cat.questions.length,
    0,
  );
  const answeredQuestions = Object.keys(skillAnswers).length;
  const allAnswered = answeredQuestions >= totalQuestions && occupation;

  const category = categories[currentCategory];
  const accentText = themeAccent === "fire" ? "text-fire" : "text-gold";
  const accentBorder = themeAccent === "fire" ? "border-fire" : "border-gold";
  const accentBg = themeAccent === "fire" ? "bg-fire/20" : "bg-gold/20";
  const accentBgLight = themeAccent === "fire" ? "bg-fire/15" : "bg-gold/15";
  const accentBorderLight = themeAccent === "fire" ? "border-fire/40" : "border-gold/40";
  const accentHover = themeAccent === "fire" ? "hover:border-fire hover:bg-fire/10" : "hover:border-gold hover:bg-gold/10";
  const progressGradient = themeAccent === "fire"
    ? "bg-gradient-to-r from-fire/60 to-fire"
    : "bg-gradient-to-r from-gold/60 to-gold";

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <Wrench className={`w-8 h-8 ${accentText} mx-auto mb-3`} />
        <h2 className={`text-2xl font-bold ${accentText} mb-2`}>{stepTitle}</h2>
        <p className="text-text-secondary text-sm">{stepSubtitle}</p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>
            回答済み: {answeredQuestions}/{totalQuestions}
          </span>
          <span>{Math.round((answeredQuestions / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-bg-card rounded-full overflow-hidden">
          <div
            className={`h-full ${progressGradient} rounded-full transition-all duration-500`}
            style={{
              width: `${(answeredQuestions / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 職種選択（最初だけ表示） */}
      {!occupation && (
        <div className="rpg-frame rounded-lg p-6 mb-6">
          <h3 className={`${accentText} font-bold mb-3`}>{occupationLabel}</h3>
          <div className="grid grid-cols-2 gap-2">
            {occupations.map((occ) => (
              <button
                key={occ.id}
                onClick={() => onSetOccupation(occ.id)}
                className={`px-3 py-2 text-sm rounded-lg border border-border-rpg bg-bg-secondary text-foreground ${accentHover} transition-all cursor-pointer text-left`}
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
            {categories.map((cat, i) => {
              const catAnswered = cat.questions.filter(
                (q) => skillAnswers[q.id] !== undefined,
              ).length;
              const isComplete = catAnswered === cat.questions.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setCurrentCategory(i)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                    i === currentCategory
                      ? `${accentBg} ${accentText} border ${accentBorderLight}`
                      : isComplete
                        ? "bg-nature/10 text-nature border border-nature/30"
                        : "bg-bg-card text-text-secondary border border-border-rpg/30 hover:border-border-rpg"
                  }`}
                >
                  <span className={AXIS_COLORS[cat.id]}>{ICON_MAP[cat.icon]}</span>
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
                <p className="text-foreground text-sm font-bold mb-3">{question.text}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => {
                        onSetSkillAnswer(question.id, option.value);
                        setSelectedOptionIndex((prev) => ({
                          ...prev,
                          [question.id]: optIdx,
                        }));
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer border ${
                        selectedOptionIndex[question.id] === optIdx
                          ? `${accentBgLight} ${accentBorder} ${accentText}`
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
            {currentCategory < categories.length - 1 ? (
              <Button onClick={() => setCurrentCategory((c) => c + 1)} className="flex-1">
                次のカテゴリー <ArrowRight className="inline w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={onSubmit}
                disabled={!allAnswered}
                className="flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
                size="lg"
              >
                {submitLabel}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
