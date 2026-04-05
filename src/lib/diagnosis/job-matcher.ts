import type {
  CoreParams,
  SubParams,
  Job,
  JobMatchResult,
  AnimalResult,
  NumerologyResult,
} from "@/types/diagnosis";
import { JOBS } from "@/data/jobs";
import { calculateSubParams } from "./skill-calculator";

/**
 * コアパラメータからベストマッチのジョブを判定
 * 重み付きユークリッド距離でスコアリング
 */
export function matchJob(
  coreParams: CoreParams,
  animalResult: AnimalResult,
  numerologyResult: NumerologyResult
): JobMatchResult {
  const scored = JOBS.map((job) => {
    // 重み付きユークリッド距離
    const distance = Math.sqrt(
      job.weights.communication *
        (coreParams.communication - job.requiredParams.communication) ** 2 +
        job.weights.specialist *
          (coreParams.specialist - job.requiredParams.specialist) ** 2 +
        job.weights.marketing *
          (coreParams.marketing - job.requiredParams.marketing) ** 2 +
        job.weights.ai * (coreParams.ai - job.requiredParams.ai) ** 2
    );

    // 動物相性ボーナス
    const animalBonus = job.compatibleAnimals.includes(animalResult.number)
      ? 8
      : 0;

    // 距離を100点満点のスコアに変換
    const maxDistance = 150;
    const score = Math.max(
      0,
      Math.min(100, Math.round((1 - distance / maxDistance) * 100) + animalBonus)
    );

    return { job, score };
  });

  // スコア順にソート
  scored.sort((a, b) => b.score - a.score);

  const primary = scored[0];
  const runnerUp = scored[1];

  // 上級ジョブの解決
  const advancedJobs = primary.job.advancedJobs
    .map((id) => JOBS.find((j) => j.id === id))
    .filter((j): j is Job => j !== undefined);

  // サブパラメータ算出
  const subParams = calculateSubParams(coreParams, animalResult);

  return {
    primaryJob: primary.job,
    matchScore: primary.score,
    runnerUp: runnerUp.job,
    advancedJobs,
    coreParams,
    subParams,
  };
}

/**
 * ジョブ間の差分を計算（上級ジョブへの必要パラメータ差分）
 */
export function calculateJobGap(
  currentParams: CoreParams,
  targetJob: Job
): CoreParams {
  return {
    communication: Math.max(
      0,
      targetJob.requiredParams.communication - currentParams.communication
    ),
    specialist: Math.max(
      0,
      targetJob.requiredParams.specialist - currentParams.specialist
    ),
    marketing: Math.max(
      0,
      targetJob.requiredParams.marketing - currentParams.marketing
    ),
    ai: Math.max(0, targetJob.requiredParams.ai - currentParams.ai),
  };
}
