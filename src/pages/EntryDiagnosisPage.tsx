import { useNavigate, Link } from "react-router-dom";
import { useEntryDiagnosis } from "@/hooks/useEntryDiagnosis";
import { BirthdayInput } from "@/components/diagnosis/BirthdayInput";
import { NatureResult } from "@/components/diagnosis/NatureResult";
import { QuickPersonality } from "@/components/diagnosis/QuickPersonality";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowLeft } from "lucide-react";

export function EntryDiagnosisPage() {
  const navigate = useNavigate();
  const {
    state,
    submitBirthday,
    goToQuickPersonality,
    setQuickAnswer,
    computeResult,
  } = useEntryDiagnosis();

  const handleQuickSubmit = () => {
    computeResult();
    navigate("/choose");
  };

  return (
    <div className="min-h-screen bg-bg-primary py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-1 text-text-secondary text-xs hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップへ戻る
          </Link>
          <h1 className="text-gold font-bold text-lg">ABILITY DIAGNOSIS</h1>
          <div className="w-20" />
        </div>

        {/* Progress */}
        <div className="mb-10">
          <ProgressBar
            currentStep={state.step}
            totalSteps={3}
            labels={["生年月日", "性質判定", "タイプチェック"]}
          />
        </div>

        {/* Step 1: Birthday */}
        {state.step === 1 && <BirthdayInput onSubmit={submitBirthday} />}

        {/* Step 2: Nature Result */}
        {state.step === 2 && state.animalResult && state.numerologyResult && (
          <NatureResult
            animalResult={state.animalResult}
            numerologyResult={state.numerologyResult}
            onNext={goToQuickPersonality}
          />
        )}

        {/* Step 3: Quick Personality */}
        {state.step === 3 && (
          <QuickPersonality
            answers={state.quickAnswers}
            onSelect={setQuickAnswer}
            onSubmit={handleQuickSubmit}
          />
        )}
      </div>
    </div>
  );
}
