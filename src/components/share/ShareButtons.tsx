import type { JobMatchResult, ShareData } from "@/types/diagnosis";
import {
  generateShareText,
  generateShareUrl,
  getTwitterShareUrl,
  getLineShareUrl,
  encodeShareData,
} from "@/lib/share";
import { Share2, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  jobResult: JobMatchResult;
  animalNumber: number;
  lifePathNumber: number;
}

export function ShareButtons({
  jobResult,
  animalNumber,
  lifePathNumber,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareData: ShareData = {
    j: jobResult.primaryJob.id,
    s: jobResult.matchScore,
    p: [
      jobResult.coreParams.communication,
      jobResult.coreParams.specialist,
      jobResult.coreParams.marketing,
      jobResult.coreParams.ai,
    ],
    a: animalNumber,
    n: lifePathNumber,
  };

  const baseUrl =
    typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = generateShareUrl(baseUrl, shareData);
  const shareText = generateShareText(
    jobResult.primaryJob.name,
    jobResult.matchScore
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="rpg-frame rounded-lg p-4">
      <h3 className="text-gold font-bold mb-3 flex items-center gap-2">
        <Share2 className="w-5 h-5" />
        結果をシェアする
      </h3>
      <div className="flex gap-2 flex-wrap">
        <a
          href={getTwitterShareUrl(shareText, shareUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[100px] px-4 py-3 bg-[#1da1f2]/10 text-[#1da1f2] border border-[#1da1f2]/30 rounded-lg text-sm font-bold text-center hover:bg-[#1da1f2]/20 transition-colors"
        >
          X (Twitter)
        </a>
        <a
          href={getLineShareUrl(shareText, shareUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-w-[100px] px-4 py-3 bg-[#06c755]/10 text-[#06c755] border border-[#06c755]/30 rounded-lg text-sm font-bold text-center hover:bg-[#06c755]/20 transition-colors"
        >
          LINE
        </a>
        <button
          onClick={handleCopy}
          className="flex-1 min-w-[100px] px-4 py-3 bg-bg-secondary text-foreground border border-border-rpg rounded-lg text-sm font-bold text-center hover:bg-bg-card transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-nature" />
              コピー済み
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              コピー
            </>
          )}
        </button>
      </div>
    </div>
  );
}
