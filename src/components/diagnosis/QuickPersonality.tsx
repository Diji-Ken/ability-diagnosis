import { QUICK_PERSONALITY_QUESTIONS } from "@/lib/diagnosis/quick-personality";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

interface QuickPersonalityProps {
  answers: Record<string, number>;
  onSelect: (questionId: string, optionIndex: number) => void;
  onSubmit: () => void;
}

export function QuickPersonality({ answers, onSelect, onSubmit }: QuickPersonalityProps) {
  const answered = Object.keys(answers).length;
  const total = QUICK_PERSONALITY_QUESTIONS.length;
  const allAnswered = answered >= total;

  return (
    <div className="animate-fade-in-up max-w-lg mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gold mb-2">ちょっとした質問</h2>
        <p className="text-text-secondary text-sm">
          あなたに合った冒険を見つけるために、{total}問だけ答えてください
        </p>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>
            {answered}/{total}
          </span>
          <span>{Math.round((answered / total) * 100)}%</span>
        </div>
        <div className="h-2 bg-bg-card rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full transition-all duration-500"
            style={{ width: `${(answered / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4 mb-6">
        {QUICK_PERSONALITY_QUESTIONS.map((q) => (
          <div key={q.id} className="rpg-frame rounded-lg p-4">
            <p className="text-foreground text-sm font-bold mb-3">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((option, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => onSelect(q.id, optIdx)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all cursor-pointer border ${
                    answers[q.id] === optIdx
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

      <Button
        onClick={onSubmit}
        disabled={!allAnswered}
        className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
        size="lg"
      >
        冒険モードを選ぶ <ArrowRight className="inline w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
