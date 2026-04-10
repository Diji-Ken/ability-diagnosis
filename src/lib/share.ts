import type { ShareData, Track } from "@/types/diagnosis";

/**
 * 診断結果をShareDataにエンコード
 */
export function encodeShareData(data: ShareData): string {
  const json = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * ShareDataをデコード
 */
export function decodeShareData(encoded: string): ShareData | null {
  try {
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    return JSON.parse(json) as ShareData;
  } catch {
    return null;
  }
}

/**
 * シェア用テキストを生成
 */
export function generateShareText(
  jobName: string,
  matchScore: number,
  track: Track = "job",
): string {
  const productTag = track === "love" ? "#アビリティラブ診断" : "#アビリティジョブ診断";
  const prefix = track === "love" ? "私の恋愛ジョブは" : "私のジョブは";
  const suffix = track === "love" ? "あなたの恋愛ジョブは？" : "あなたのジョブは？";
  return `${prefix}「${jobName}」でした！（マッチ度${matchScore}%）\n${suffix}\n\n${productTag}`;
}

/**
 * シェア用URLを生成（track-scoped）
 */
export function generateShareUrl(
  baseUrl: string,
  shareData: ShareData,
  track: Track = "job",
): string {
  const encoded = encodeShareData(shareData);
  return `${baseUrl}/share/${track}/${encoded}`;
}

/**
 * X（Twitter）シェアURL
 */
export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({ text, url });
  return `https://twitter.com/intent/tweet?${params.toString()}`;
}

/**
 * LINEシェアURL
 */
export function getLineShareUrl(text: string, url: string): string {
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    url,
  )}&text=${encodeURIComponent(text)}`;
}
