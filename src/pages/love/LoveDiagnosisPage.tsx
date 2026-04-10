import { TrackDiagnosisBody } from "@/components/diagnosis/TrackDiagnosisBody";
import { LOVE_TRACK } from "@/config/trackConfig";

export function LoveDiagnosisPage() {
  return <TrackDiagnosisBody config={LOVE_TRACK} />;
}
