import { Link } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import { Swords, Sparkles, BarChart3, Share2, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-4 py-3 border-b border-border-primary/30">
        <div className="flex items-center gap-2">
          <Swords className="w-5 h-5 text-gold" />
          <span className="text-gold font-bold text-sm">ABILITY JOB</span>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link to="/dashboard" className="rpg-button px-4 py-1.5 text-sm font-medium">
              ダッシュボード
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-text-secondary hover:text-gold text-sm flex items-center gap-1 transition-colors">
                <LogIn className="w-4 h-4" />
                ログイン
              </Link>
              <Link to="/signup" className="rpg-button px-4 py-1.5 text-sm font-medium">
                新規登録
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <Swords className="w-16 h-16 text-gold mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-black text-gold text-glow mb-4">
              ABILITY JOB
              <br />
              DIAGNOSIS
            </h1>
            <p className="text-xl text-foreground font-bold mb-2">
              アビリティジョブ診断
            </p>
            <p className="text-text-secondary leading-relaxed">
              あなたのスキルをRPG風ジョブで可視化。
              <br />
              生年月日とスキルから、あなただけのジョブを診断します。
            </p>
          </div>

          <Link to="/diagnosis">
            <Button size="lg" className="text-lg px-10">
              診断をはじめる <ArrowRight className="inline w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gold text-center mb-10">
            診断の流れ
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-thunder" />}
              step="STEP 1"
              title="性質診断"
              description="生年月日から、あなたの生まれ持った性質を分析します。"
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-fire" />}
              step="STEP 2"
              title="スキル棚卸し"
              description="現在のスキルレベルを4つの軸で棚卸しします。"
            />
            <FeatureCard
              icon={<Swords className="w-8 h-8 text-gold" />}
              step="STEP 3"
              title="ジョブ判定"
              description="性質とスキルからベストマッチのジョブを判定。成長ロードマップも提示します。"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="rpg-frame rounded-lg p-8">
            <Share2 className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gold mb-3">
              結果をシェアしよう
            </h2>
            <p className="text-text-secondary text-sm mb-6">
              診断結果はX（Twitter）やLINEでシェアできます。
              <br />
              友達と比べてみましょう！
            </p>
            <Link to="/diagnosis">
              <Button size="lg">
                無料で診断する <ArrowRight className="inline w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-rpg/30 py-8 px-4 text-center">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mb-3">
          <Link
            to="/legal/terms"
            className="text-text-secondary hover:text-gold text-xs transition-colors"
          >
            利用規約
          </Link>
          <span className="text-text-secondary/40 text-xs">|</span>
          <Link
            to="/legal/privacy"
            className="text-text-secondary hover:text-gold text-xs transition-colors"
          >
            プライバシーポリシー
          </Link>
          <span className="text-text-secondary/40 text-xs">|</span>
          <Link
            to="/legal/commercial"
            className="text-text-secondary hover:text-gold text-xs transition-colors"
          >
            特定商取引法に基づく表記
          </Link>
        </nav>
        <p className="text-text-secondary text-xs">
          &copy; 2025 ABILITY JOB DIAGNOSIS
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  step,
  title,
  description,
}: {
  icon: React.ReactNode;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rpg-frame rounded-lg p-6 text-center">
      <div className="mb-3">{icon}</div>
      <span className="text-text-secondary text-xs font-bold">{step}</span>
      <h3 className="text-foreground font-bold text-lg mb-2">{title}</h3>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}
