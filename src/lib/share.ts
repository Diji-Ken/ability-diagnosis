import type { ShareData, CoreParams } from "@/types/diagnosis";
import { JOBS } from "@/data/jobs";

/**
 * 診断結果をShareDataにエンコード
 */
export function encodeShareData(data: ShareData): string {
  const json = JSON.stringify(data);
  // Base64URLエンコード
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
export function generateShareText(jobName: string, matchScore: number): string {
  return `私のジョブは「${jobName}」でした！（マッチ度${matchScore}%）\nあなたのジョブは？\n\n#アビリティジョブ診断`;
}

/**
 * シェア用URLを生成
 */
export function generateShareUrl(
  baseUrl: string,
  shareData: ShareData
): string {
  const encoded = encodeShareData(shareData);
  return `${baseUrl}/share/${encoded}`;
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
  const message = `${text}\n${url}`;
  return `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
}
