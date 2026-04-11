import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export function PrivacyPage() {
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
          <Shield className="w-12 h-12 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-2">
            プライバシーポリシー
          </h1>
          <p className="text-text-secondary text-sm">
            ABILITY DIAGNOSIS における個人情報の取り扱いについて。
          </p>
        </header>

        <article className="rpg-frame rounded-lg p-6 md:p-8 space-y-8 text-foreground leading-relaxed">
          <p className="text-text-secondary text-sm">
            当運営は、本サービス「ABILITY DIAGNOSIS」（以下「本サービス」といいます）におけるユーザーの個人情報の取り扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
          </p>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">1. 基本方針</h2>
            <p className="text-text-secondary">
              当運営は、個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守するとともに、本ポリシーに従って個人情報を適切に取り扱います。
              本サービスは、診断・ゲーミフィケーション・自己理解の支援を目的としており、ユーザーの個人情報を商業目的で第三者に販売することは一切ありません。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">2. 取得する個人情報の項目</h2>

            <h3 className="text-lg font-bold text-fire mt-4 mb-2">必須項目</h3>
            <ul className="text-text-secondary list-disc list-inside space-y-1">
              <li>メールアドレス（アカウント認証に使用）</li>
              <li>生年月日（動物キャラ判定・数秘術計算に使用）</li>
            </ul>

            <h3 className="text-lg font-bold text-fire mt-4 mb-2">任意項目</h3>
            <ul className="text-text-secondary list-disc list-inside space-y-1">
              <li>表示名・プロフィール情報</li>
              <li>JOB / LOVE 各 13 問のスキル質問への回答</li>
              <li>冒険日誌の本文・ムード（5段階）</li>
              <li>職種、恋愛の現状などの追加情報</li>
            </ul>

            <h3 className="text-lg font-bold text-fire mt-4 mb-2">自動的に収集される情報</h3>
            <ul className="text-text-secondary list-disc list-inside space-y-1">
              <li>アクセスログ（IPアドレスは原則として保存しません）</li>
              <li>Vercel / Supabase の接続ログ（各サービスの基準で保管）</li>
              <li>診断の進行状況、レベル・EXP・バッジ獲得などのゲーム内データ</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">3. 個人情報の利用目的</h2>
            <p className="text-text-secondary mb-2">
              当運営は、取得した個人情報を以下の目的でのみ利用します。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>アカウント認証および本人識別</li>
              <li>診断結果（動物キャラ、JOB、LOVE ジョブ、相性等）の生成・保存・表示</li>
              <li>ゲーミフィケーション機能（レベル100、EXP、ポイント、バッジ16個、ジョブ進化）の管理</li>
              <li>冒険日誌・週間レポート・成長記録の管理</li>
              <li>ユーザーが明示的に実行した場合の AI 分析機能の提供</li>
              <li>サービス改善のための統計データの取得（個人を特定できない形式に集計）</li>
              <li>本サービスに関する重要なお知らせ・障害情報の配信</li>
              <li>不正利用・規約違反への対応</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">4. 個人情報の第三者提供</h2>
            <p className="text-text-secondary mb-2">
              当運営は、法令に基づく場合を除き、ユーザー本人の同意なく個人情報を第三者に提供することはありません。
              ただし、本サービスの提供のために、以下の事業者をデータ処理者として利用しており、必要な範囲で情報を取り扱います。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Supabase</strong>: データベースおよび認証基盤として利用（AWS リージョン）</li>
              <li><strong className="text-foreground">Vercel</strong>: アプリケーションのホスティングおよびエッジ配信</li>
              <li><strong className="text-foreground">Google</strong>: OAuth ログイン機能（ユーザーが Google ログインを選択した場合のみ）</li>
              <li><strong className="text-foreground">Anthropic / OpenAI</strong>: AI 分析機能（ユーザーが明示的に実行した時のみ、匿名化された診断データを送信）</li>
            </ul>
            <p className="text-text-secondary mt-2">
              これらの事業者は、それぞれが定めるプライバシーポリシーおよびセキュリティ基準に基づいてデータを取り扱います。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">5. 個人情報の開示・訂正・削除</h2>
            <p className="text-text-secondary">
              ユーザーは、いつでも自身の個人情報の開示、訂正、追加、削除、利用停止を当運営に請求することができます。
              アカウント設定画面から表示名・プロフィール情報の変更、診断履歴の削除、アカウント自体の削除を行えます。
              アカウント削除後の追加対応が必要な場合は、お問い合わせ窓口までご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">6. Cookie・ローカルストレージの使用</h2>
            <p className="text-text-secondary mb-2">
              本サービスでは、ユーザー体験の向上とサービス提供のため、以下の技術を利用しています。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li><strong className="text-foreground">Cookie</strong>: Supabase 認証セッションの維持に使用（HttpOnly、Secure 属性付き）</li>
              <li><strong className="text-foreground">sessionStorage</strong>: 入口診断の一時データ保存に使用</li>
              <li><strong className="text-foreground">localStorage</strong>: テーマ設定、UI の状態保存に使用</li>
            </ul>
            <p className="text-text-secondary mt-2">
              ブラウザの設定により Cookie やストレージ機能を無効にすることもできますが、その場合は本サービスの一部機能が利用できなくなる可能性があります。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">7. アクセス解析ツールの使用</h2>
            <p className="text-text-secondary">
              本ポリシー策定時点では、Google Analytics などのサードパーティ製アクセス解析ツールは導入していません。
              将来導入する際には、本ポリシーを更新したうえで別途お知らせします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">8. 個人情報の保管期間</h2>
            <p className="text-text-secondary">
              個人情報は、ユーザーがアカウントを保持している期間中、本ポリシーに定める利用目的の達成に必要な範囲で保管します。
              アカウントが削除された場合、当運営は合理的な期間内に個人情報を消去または匿名化します。
              なお、バックアップデータについては、ローテーションのうえ順次削除されます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">9. セキュリティ対策</h2>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>すべての通信は HTTPS により暗号化されます。</li>
              <li>Supabase の RLS（Row Level Security: ユーザーごとのアクセス制御）を有効化し、他ユーザーのデータにアクセスできない設計としています。</li>
              <li>パスワードは Supabase 認証基盤によりハッシュ化されて保管されます。</li>
              <li>定期的なバックアップを実施しています。</li>
              <li>当運営は、個人情報の漏えい、滅失、毀損の防止に必要な措置を講じます。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">10. 未成年者の個人情報</h2>
            <p className="text-text-secondary">
              本サービスは13歳以上の方を対象としています。13歳未満の方の個人情報は取得しません。
              13歳以上18歳未満の未成年の方が利用される場合は、必ず保護者の同意を得たうえでご利用ください。
              誤って13歳未満の方の情報を取得したことが判明した場合は、速やかに当該情報を削除します。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">11. プライバシーポリシーの変更</h2>
            <p className="text-text-secondary">
              当運営は、必要に応じて本ポリシーを変更することがあります。
              変更後のポリシーは本ページに掲載した時点から効力を生じるものとし、重要な変更がある場合は本サービス内で別途お知らせします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">12. お問い合わせ窓口</h2>
            <p className="text-text-secondary">
              本ポリシーおよび個人情報の取り扱いに関するお問い合わせは、以下までご連絡ください。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2 mt-2">
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
          </section>

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
