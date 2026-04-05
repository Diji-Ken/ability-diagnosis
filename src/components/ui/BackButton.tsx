import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-1 text-text-secondary text-xs hover:text-gold transition-colors cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      戻る
    </button>
  );
}
