import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar } from "lucide-react";

interface BirthdayInputProps {
  onSubmit: (year: number, month: number, day: number) => void;
}

export function BirthdayInput({ onSubmit }: BirthdayInputProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number | "">(1990);
  const [month, setMonth] = useState<number | "">(1);
  const [day, setDay] = useState<number | "">(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (year && month && day) {
      onSubmit(year, month, day);
    }
  };

  const isValid = year && month && day && year >= 1920 && year <= currentYear;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-center gap-3 mb-6">
        <Calendar className="w-8 h-8 text-gold" />
        <h2 className="text-2xl md:text-3xl font-bold text-gold">
          STEP 1: 性質診断
        </h2>
      </div>

      <p className="text-text-secondary text-center mb-8">
        生年月日を入力してください。
        <br />
        あなたの生まれ持った性質を診断します。
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="rpg-frame rounded-lg p-6 mb-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="block text-text-secondary text-xs mb-1">
                年
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-3 py-3 text-foreground text-center appearance-none cursor-pointer focus:border-gold focus:outline-none"
              >
                {Array.from(
                  { length: currentYear - 1920 + 1 },
                  (_, i) => currentYear - i
                ).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-text-secondary text-xs mb-1">
                月
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-3 py-3 text-foreground text-center appearance-none cursor-pointer focus:border-gold focus:outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-text-secondary text-xs mb-1">
                日
              </label>
              <select
                value={day}
                onChange={(e) => setDay(Number(e.target.value))}
                className="w-full bg-bg-secondary border border-border-rpg rounded-lg px-3 py-3 text-foreground text-center appearance-none cursor-pointer focus:border-gold focus:outline-none"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={!isValid}
          className="w-full disabled:opacity-40 disabled:cursor-not-allowed"
          size="lg"
        >
          診断する
        </Button>
      </form>
    </div>
  );
}
