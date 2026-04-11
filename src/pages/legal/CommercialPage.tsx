import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

export function CommercialPage() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <nav className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-text-secondary hover:text-gold text-sm flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップへ戻る
          </Link>
          <span className="text-gold text-xs font-bold">LEGAL</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <header className="text-center mb-10">
          <FileText className="w-12 h-12 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-2">
            特定商取引法に基づく表記
          </h1>
          <p className="text-text-secondary text-sm">
            ABILITY DIAGNOSIS の事業者情報および取引条件。
          </p>
        </header>

        <article className="rpg-frame rounded-lg p-6 md:p-8 space-y-6 text-foreground leading-relaxed">
          <div className="rounded-md border border-fire/40 bg-fire/5 p-4">
            <p className="text-text-secondary text-sm">
              本サービスは現時点で全機能を無料で提供しているため、特定商取引法（特商法）の適用対象外です。
              ただし、今後の有料機能追加に備え、また誠実な情報開示の観点から、以下の表記を公開しています。
              有料機能を導入する際には、本ページを更新し、価格・支払方法・返品ポリシー等を明確に提示します。
            </p>
          </div>

          <dl className="space-y-5">
            <div>
              <dt className="text-fire font-bold mb-1">サービス名</dt>
              <dd className="text-text-secondary">ABILITY DIAGNOSIS（アビリティ ダイアグノシス）</dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">事業者名</dt>
              <dd className="text-text-secondary">
                個人開発者として運営しています。一般公開時に正式な氏名・屋号等へ差し替え予定です。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">運営責任者</dt>
              <dd className="text-text-secondary">同上（個人開発者）</dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">所在地</dt>
              <dd className="text-text-secondary">
                個人開発のため非公開としています。請求があった場合は、遅滞なく開示します。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">電話番号</dt>
              <dd className="text-text-secondary">
                個人開発のため非公開としています。請求があった場合は、遅滞なく開示します。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">連絡先</dt>
              <dd className="text-text-secondary">
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    GitHub Issues:{" "}
                    <a
                      href="https://github.com/Diji-Ken/ability-diagnosis/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fire underline hover:text-gold transition-colors"
                    >
                      https://github.com/Diji-Ken/ability-diagnosis/issues
                    </a>
                  </li>
                  <li>メール: ability-diagnosis-support@example.com（仮設置）</li>
                </ul>
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">販売価格</dt>
              <dd className="text-text-secondary">
                現時点では販売対象となる商品・サービスはありません。すべての機能を無料でご利用いただけます。
                有料機能を提供開始する際には、本ページおよび本サービス内で別途お知らせします。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">商品代金以外の必要料金</dt>
              <dd className="text-text-secondary">
                インターネット接続料金、通信料金等はユーザーのご負担となります。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">支払方法</dt>
              <dd className="text-text-secondary">
                現時点では発生しません。有料機能の開始時に、クレジットカード、各種電子決済等の利用可能な手段を案内します。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">支払時期</dt>
              <dd className="text-text-secondary">
                現時点では発生しません。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">サービスの提供時期</dt>
              <dd className="text-text-secondary">
                アカウント登録完了後、即時にご利用いただけます。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">返品・キャンセルについて</dt>
              <dd className="text-text-secondary">
                現在は無料サービスのため、返品・キャンセル対応はありません。
                有料機能の追加時には、その内容に応じたキャンセルポリシーを別途定めて公開します。デジタルコンテンツの性質上、提供開始後の返金は原則として行わない方針を予定しています。
              </dd>
            </div>

            <div>
              <dt className="text-fire font-bold mb-1">動作環境</dt>
              <dd className="text-text-secondary">
                <ul className="list-disc list-inside space-y-1">
                  <li>最新版の Google Chrome、Apple Safari、Mozilla Firefox、Microsoft Edge</li>
                  <li>JavaScript が有効であること</li>
                  <li>Cookie および localStorage が利用可能であること</li>
                </ul>
              </dd>
            </div>
          </dl>

          <p className="text-text-secondary text-xs text-right pt-4 border-t border-border-rpg/30">
            最終更新日: 2026年4月11日
          </p>
        </article>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="text-text-secondary hover:text-gold text-sm inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップへ戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
