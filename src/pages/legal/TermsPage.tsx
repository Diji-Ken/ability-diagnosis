import { Link } from "react-router-dom";
import { ArrowLeft, ScrollText } from "lucide-react";

export function TermsPage() {
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
          <ScrollText className="w-12 h-12 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-2">
            利用規約
          </h1>
          <p className="text-text-secondary text-sm">
            ABILITY DIAGNOSIS をご利用いただく前に、必ずお読みください。
          </p>
        </header>

        <article className="rpg-frame rounded-lg p-6 md:p-8 space-y-8 text-foreground leading-relaxed">
          <p className="text-text-secondary text-sm">
            この利用規約（以下「本規約」といいます）は、当運営が提供する自己理解＆スキル診断サービス「ABILITY DIAGNOSIS」（以下「本サービス」といいます）の利用条件を定めるものです。
            ユーザーの皆さま（以下「ユーザー」といいます）には、本規約に同意のうえ本サービスをご利用いただきます。
          </p>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第1条（総則）</h2>
            <p className="text-text-secondary">
              本規約は、本サービスの提供条件およびユーザーと当運営との間の権利義務関係を定めることを目的とし、ユーザーと当運営との間の本サービスの利用に関わる一切の関係に適用されます。
              本サービス上で当運営が掲載する個別の注意書きやガイドラインも、本規約の一部を構成するものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第2条（利用登録）</h2>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>本サービスの利用を希望する方は、本規約に同意のうえ、当運営の定める方法によって利用登録を行うものとします。</li>
              <li>本サービスは13歳以上の方を対象としています。13歳未満の方はご利用いただけません。13歳以上18歳未満の方は、保護者の同意を得たうえでご利用ください。</li>
              <li>利用登録の際に虚偽の情報（生年月日、メールアドレス等）を登録することは禁止します。診断結果の正確性に関わるため、生年月日は正しい情報をご入力ください。</li>
              <li>当運営は、登録希望者が本規約に違反したことがある場合や、その他登録が不適当と判断した場合には、登録をお断りすることがあります。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第3条（禁止事項）</h2>
            <p className="text-text-secondary mb-2">
              ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスのサーバーやネットワークに対する不正アクセス、過度な負荷をかける行為（bot などによる大量アクセス、スクレイピング等）</li>
              <li>本サービスを構成するソフトウェアのリバースエンジニアリング、逆コンパイル、逆アセンブル、改変</li>
              <li>他のユーザーに対する誹謗中傷、なりすまし、嫌がらせ、迷惑行為</li>
              <li>当運営や第三者の知的財産権、肖像権、プライバシー、名誉、その他の権利を侵害する行為</li>
              <li>冒険日誌などの投稿機能を悪用した、スパム・宣伝行為・違法な情報の掲載</li>
              <li>本サービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーのアカウント情報を不正に取得・利用する行為</li>
              <li>その他、当運営が不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第4条（本サービスの提供停止）</h2>
            <p className="text-text-secondary mb-2">
              当運営は、以下のいずれかに該当する場合、ユーザーへの事前通知なく、本サービスの全部または一部の提供を停止することがあります。
            </p>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>本サービスにかかるシステムの保守点検または更新を行う場合</li>
              <li>地震、落雷、火災、停電、天災などの不可抗力により本サービスの提供が困難となった場合</li>
              <li>利用しているクラウド事業者（Supabase、Vercel など）に障害が発生した場合</li>
              <li>その他、当運営が本サービスの提供が困難と判断した場合</li>
            </ul>
            <p className="text-text-secondary mt-2">
              当運営は、本サービスの提供停止または中断により、ユーザーまたは第三者が被ったいかなる不利益や損害についても、一切の責任を負わないものとします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第5条（著作権・コンテンツの取り扱い）</h2>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>本サービスに掲載されている文章、画像、ロゴ、診断ロジック、ジョブ・LOVE ジョブの設定、バッジデザイン等の著作権は、当運営または正当な権利者に帰属します。</li>
              <li>ユーザーが冒険日誌等に投稿したテキストやムード記録の著作権は、ユーザー自身に帰属します。</li>
              <li>ただし、ユーザーは、本サービスの提供・改善・バックアップ・統計分析（個人を特定できない形式に限ります）のために必要な範囲で、当運営が当該投稿コンテンツを無償・非独占的に利用することを許諾するものとします。</li>
              <li>ユーザーは、自らの投稿が第三者の権利を侵害しないことを保証するものとします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第6条（免責事項）</h2>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>本サービスが提供する診断結果（ジョブ判定、LOVE ジョブ判定、相性、レベル、AI分析等）は、個性心理学および数秘術、その他の独自ロジックに基づくエンターテインメントを目的とした参考情報です。診断結果の科学的・医学的・法的な正確性を保証するものではありません。</li>
              <li>本サービスの診断結果を踏まえてユーザーが行ったキャリア選択、転職、恋愛、人間関係、その他あらゆる意思決定およびその結果について、当運営は一切の責任を負いません。</li>
              <li>本サービスから提供される情報は、医療・心理・法律・キャリアの専門的助言に代わるものではありません。重要な意思決定の際は、必ず適切な専門家にご相談ください。</li>
              <li>当運営は、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティに関する欠陥、エラー、バグ、権利侵害などを含みます）がないことを明示的にも黙示的にも保証しません。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第7条（サービス内容の変更・終了）</h2>
            <p className="text-text-secondary">
              当運営は、ユーザーへの事前の通知なく、本サービスの内容を変更したり、本サービスの提供を中止することができるものとします。
              これによってユーザーに生じた損害について、当運営は一切の責任を負いません。サービス終了時には、可能な範囲でデータの取り出しに関する案内を行うよう努めます。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第8条（利用規約の変更）</h2>
            <p className="text-text-secondary">
              当運営は、必要と判断した場合には、ユーザーへ通知することなく本規約をいつでも変更することができるものとします。
              なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第9条（準拠法・裁判管轄）</h2>
            <ul className="text-text-secondary list-disc list-inside space-y-2">
              <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
              <li>本サービスに関して紛争が生じた場合には、当運営の所在地を管轄する裁判所（東京地方裁判所）を第一審の専属的合意管轄裁判所とします。</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gold mb-3">第10条（お問い合わせ窓口）</h2>
            <p className="text-text-secondary">
              本規約に関するお問い合わせは、以下の窓口までご連絡ください。
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
              <li>メール: contact@digitool-lab.com</li>
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
