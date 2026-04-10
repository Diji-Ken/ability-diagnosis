import { TrackDiagnosisBody } from "@/components/diagnosis/TrackDiagnosisBody";
import { JOB_TRACK } from "@/config/trackConfig";

export function JobDiagnosisPage() {
  return <TrackDiagnosisBody config={JOB_TRACK} />;
}
