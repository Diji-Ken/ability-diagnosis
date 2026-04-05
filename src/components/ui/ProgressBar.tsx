import { clsx } from "clsx";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export function ProgressBar({
  currentStep,
  totalSteps,
  labels,
}: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300",
                i + 1 <= currentStep
                  ? "bg-gold/20 border-gold text-gold"
                  : "bg-bg-card border-border-rpg text-text-secondary"
              )}
            >
              {i + 1}
            </div>
            {labels?.[i] && (
              <span
                className={clsx(
                  "text-xs mt-1 text-center",
                  i + 1 <= currentStep ? "text-gold" : "text-text-secondary"
                )}
              >
                {labels[i]}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="h-1 bg-bg-card rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-gold/60 to-gold rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
}
