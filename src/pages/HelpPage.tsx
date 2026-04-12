import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

const tocItems = [
  { id: "about", label: "1. このマニュアルについて" },
  { id: "preparation", label: "2. 事前準備" },
  { id: "smoke", label: "3. スモークテスト" },
  { id: "functional", label: "4. 機能別テスト" },
  { id: "edge", label: "5. エッジケーステスト" },
  { id: "bug-report", label: "6. バグ報告テンプレート" },
];

const smokeTests = [
  { id: "S-01", item: "ランディングページ表示", steps: "https://ability-diagnosis.vercel.app にアクセス", expected: "サービス紹介ページが表示される" },
  { id: "S-02", item: "診断開始への遷移", steps: "「診断をはじめる」ボタンをクリック", expected: "サインアップ or 診断画面に遷移" },
  { id: "S-03", item: "新規アカウント作成", steps: "メール or Google で登録", expected: "ログイン成功、ダッシュボードに遷移" },
  { id: "S-04", item: "入口診断 Step 1", steps: "生年月日を入力し「診断する」", expected: "Step 2（性質判定結果）が表示される" },
  { id: "S-05", item: "入口診断 Step 2", steps: "性質判定結果を確認し「タイプチェックへ進む」", expected: "Step 3（4問の質問）が表示される" },
  { id: "S-06", item: "入口診断 Step 3", steps: "4問に回答し「冒険モードを選ぶ」", expected: "TrackChoice ページに遷移" },
  { id: "S-07", item: "TrackChoice", steps: "「ABILITY JOB」カードを選択", expected: "/job/diagnosis に遷移" },
  { id: "S-08", item: "JOB 本診断完走", steps: "職種選択 + 13問のスキル質問に回答", expected: "結果ページにジョブ名・レーダーチャート・アクションプランが表示" },
  { id: "S-09", item: "ダッシュボード確認", steps: "「ダッシュボードへ」をクリック", expected: "JOB ダッシュボードにジョブカードとレベルが表示される" },
  { id: "S-10", item: "TrackSwitcher", steps: "ヘッダーの「♡ 恋愛へ」をクリック", expected: "LOVE ダッシュボードに切替（未診断表示）" },
];

const functionalSections = [
  {
    id: "auth",
    title: "4.1 認証",
    description: "ユーザーの認証フロー全般をテストします。",
    points: [
      "メールでのサインアップが正常に完了するか",
      "Google OAuth でのサインアップが正常に完了するか",
      "ログイン / ログアウトが正常に動作するか",
      "パスワード再設定フローが完了するか",
    ],
  },
  {
    id: "entry-diagnosis",
    title: "4.2 入口診断",
    description: "生年月日入力から性質判定、タイプチェックまでのフローをテストします。",
    points: [
      "生年月日のバリデーション（未来日、空欄等）",
      "性質判定結果が正しく表示されるか",
      "タイプチェック4問が順番に表示されるか",
      "プログレスバーが進捗に応じて更新されるか",
    ],
  },
  {
    id: "track-choice",
    title: "4.3 TrackChoice",
    description: "冒険モード選択画面のテストです。",
    points: [
      "おすすめパーセンテージが表示されるか",
      "JOB / LOVE カードが選択可能か",
      "選択後に正しいトラックへ遷移するか",
    ],
  },
  {
    id: "job-diagnosis",
    title: "4.4 JOB 本診断",
    description: "ビジネストラックの本診断フローをテストします。",
    points: [
      "職種14種から選択できるか",
      "4カテゴリ x 3問 = 12問 + 職種1問 = 13問が表示されるか",
      "カテゴリタブの切替が正常に動作するか",
      "結果ページにジョブ名・マッチ度が表示されるか",
      "レーダーチャート（コミュ力/専門/マーケ/AI）が表示されるか",
      "サブパラメータ6軸が表示されるか",
      "上級ジョブが表示されるか",
      "アクションプランが表示されるか",
      "シェアボタンが動作するか",
    ],
  },
  {
    id: "love-diagnosis",
    title: "4.5 LOVE 本診断",
    description: "恋愛トラックの本診断フローをテストします。",
    points: [
      "現状選択が正常に動作するか",
      "4カテゴリ（共感力/アプローチ力/関係構築力/自己表現力）x 3問が表示されるか",
      "結果ページのレーダーチャートが LOVE ラベルであるか",
    ],
  },
  {
    id: "job-dashboard",
    title: "4.6 JOB ダッシュボード",
    description: "ビジネストラックのダッシュボード表示をテストします。",
    points: [
      "ゴールドテーマが適用されているか",
      "ジョブカードが表示されるか",
      "Lv / ストリーク / ポイントが表示されるか",
      "EXP バーが表示されるか",
      "Quick Actions が動作するか",
    ],
  },
  {
    id: "love-dashboard",
    title: "4.7 LOVE ダッシュボード",
    description: "恋愛トラックのダッシュボード表示をテストします。",
    points: [
      "Fire / Pink テーマが適用されているか",
      "Match / Love AI タブが表示されるか（Growth タブなし）",
      "未診断時は「あなたの恋愛ジョブを見つけましょう」が表示されるか",
    ],
  },
  {
    id: "track-switcher",
    title: "4.8 TrackSwitcher",
    description: "トラック切替機能のテストです。",
    points: [
      "「♡ 恋愛へ」/「⚔ ビジネスへ」切替が動作するか",
      "gamification データが track 別に管理されているか",
    ],
  },
  {
    id: "ai-analysis",
    title: "4.9 AI 分析",
    description: "AI分析ページのテストです。",
    points: [
      "/job/analysis で LLM 結果が表示されるか",
      "/love/analysis で LLM 結果が表示されるか",
    ],
  },
  {
    id: "journal",
    title: "4.10 冒険日誌",
    description: "日誌機能のテストです。",
    points: [
      "カレンダーが正常に表示されるか",
      "ムード5段階が選択できるか",
      "EXP + ポイントが獲得されるか",
    ],
  },
  {
    id: "weekly-report",
    title: "4.11 週間レポート",
    description: "週間レポート機能のテストです。",
    points: [
      "今週の統計が表示されるか",
      "ムードトレンドが表示されるか",
    ],
  },
  {
    id: "growth",
    title: "4.12 成長記録",
    description: "成長記録機能のテストです。",
    points: [
      "100レベルロードマップが表示されるか",
      "バッジ16個が表示されるか",
    ],
  },
  {
    id: "share",
    title: "4.13 シェア機能",
    description: "各種シェア機能のテストです。",
    points: [
      "X（Twitter）シェアボタンが動作するか",
      "LINE シェアボタンが動作するか",
      "コピーボタンが動作するか",
    ],
  },
  {
    id: "settings",
    title: "4.14 設定・プロフィール",
    description: "設定画面のテストです。",
    points: [
      "名前編集が正常に保存されるか",
      "Track 選択が正常に動作するか",
      "ログアウトが正常に動作するか",
    ],
  },
];

const edgeCases = [
  "モバイル（iPhone Safari / Android Chrome）で診断フローを1周する",
  "戻るボタンを診断途中で押した時に正しく動作するか",
  "リロードした時にsessionStorageから状態が復元されるか",
  "未ログインで /job/dashboard に直接アクセスした時にリダイレクトされるか",
  "異常な生年月日（1900年以前、2100年以降）を入力した時にバリデーションされるか",
  "2つのタブで同時に操作した時にデータが競合しないか",
  "ネットワーク切断中にボタンを押した時にエラーが適切に表示されるか",
  "Google OAuth ポップアップがブロックされた場合に案内が表示されるか",
  "/dashboard（レガシーURL）が /job/dashboard にリダイレクトされるか",
  "診断途中で放置して戻ってきた時にセッションが維持されるか",
];

const bugReportTemplate = `## バグ報告

- **発生日時**:
- **発生環境**:
  - ブラウザ:
  - OS:
  - デバイス:
- **再現手順**:
  1.
  2.
  3.
- **期待される結果**:
- **実際の結果**:
- **スクリーンショット**: あり / なし
- **緊急度**: 高 / 中 / 低
`;

function AccordionSection({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: string[];
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border-rpg/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-bg-card/30 transition-colors"
      >
        <span className="text-gold font-bold text-sm">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-text-secondary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-text-secondary flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-text-secondary text-sm">{description}</p>
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                <span className="text-gold mt-0.5">&#9670;</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export function HelpPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bugReportTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Top bar */}
      <nav className="border-b border-border-rpg/30 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-text-secondary hover:text-gold text-sm flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            トップへ戻る
          </Link>
          <span className="text-gold text-xs font-bold">HELP</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-10">
          <BookOpen className="w-12 h-12 text-gold mx-auto mb-3" />
          <h1 className="text-3xl font-black text-gold text-glow mb-2">
            テストマニュアル
          </h1>
          <p className="text-text-secondary text-sm mb-4">
            ABILITY DIAGNOSIS 本番リリース前テスト
          </p>
          <a
            href="/docs/ability-diagnosis-test-manual.docx"
            download
            className="inline-flex items-center gap-2 rpg-button px-4 py-2 text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Word版をダウンロード
          </a>
        </header>

        {/* Table of Contents */}
        <nav className="rpg-frame rounded-lg p-5 mb-10">
          <h2 className="text-lg font-bold text-gold mb-3">目次</h2>
          <ol className="space-y-1.5">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-gold hover:underline text-sm transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Section 1: About */}
        <section id="about" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-4">1. このマニュアルについて</h2>
          <div className="rpg-frame rounded-lg p-5 space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border-rpg/20">
                    <td className="py-2 pr-4 text-gold font-bold whitespace-nowrap">目的</td>
                    <td className="py-2 text-text-secondary">コアの診断フローが本番公開に耐えるか検証する</td>
                  </tr>
                  <tr className="border-b border-border-rpg/20 bg-bg-card/50">
                    <td className="py-2 pr-4 text-gold font-bold whitespace-nowrap">想定時間</td>
                    <td className="py-2 text-text-secondary">スモーク 15-20分 + 機能別 60-90分 + エッジケース 30-40分 = 合計 2-3時間</td>
                  </tr>
                  <tr className="border-b border-border-rpg/20">
                    <td className="py-2 pr-4 text-gold font-bold whitespace-nowrap">テスト環境</td>
                    <td className="py-2">
                      <a
                        href="https://ability-diagnosis.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fire underline hover:text-gold transition-colors"
                      >
                        https://ability-diagnosis.vercel.app
                      </a>
                    </td>
                  </tr>
                  <tr className="border-b border-border-rpg/20 bg-bg-card/50">
                    <td className="py-2 pr-4 text-gold font-bold whitespace-nowrap">必要なもの</td>
                    <td className="py-2 text-text-secondary">PC 1台、スマホ 1台、Google アカウント</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 text-gold font-bold whitespace-nowrap">バグ発見時</td>
                    <td className="py-2 text-text-secondary">松岡まで連絡（LINE / Chatwork）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Preparation */}
        <section id="preparation" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-4">2. 事前準備</h2>
          <div className="rpg-frame rounded-lg p-5">
            <ul className="space-y-2">
              {[
                "Chrome / Safari / Firefox の最新版を用意",
                "まだ登録していない Google アカウントまたは新規メール",
                "Incognito / Private モード推奨",
                "まずランディングページ (/) から開始",
              ].map((item, i) => (
                <li key={i} className="text-text-secondary text-sm flex items-start gap-2">
                  <span className="text-gold mt-0.5">&#9670;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 3: Smoke Test */}
        <section id="smoke" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-2">3. スモークテスト（必須・15-20分）</h2>
          <p className="text-text-secondary text-sm mb-4">
            サービスの基本フローが通ることを確認する最優先テストです。
          </p>
          <div className="rpg-frame rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border-rpg/40">
                    <th className="text-gold font-bold text-left px-3 py-2.5 whitespace-nowrap">ID</th>
                    <th className="text-gold font-bold text-left px-3 py-2.5 whitespace-nowrap">項目</th>
                    <th className="text-gold font-bold text-left px-3 py-2.5">手順</th>
                    <th className="text-gold font-bold text-left px-3 py-2.5">期待結果</th>
                  </tr>
                </thead>
                <tbody>
                  {smokeTests.map((test, i) => (
                    <tr
                      key={test.id}
                      className={`border-b border-border-rpg/20 ${
                        i % 2 === 1 ? "bg-bg-card/50" : ""
                      }`}
                    >
                      <td className="px-3 py-2.5 text-fire font-mono font-bold whitespace-nowrap">{test.id}</td>
                      <td className="px-3 py-2.5 text-foreground font-medium whitespace-nowrap">{test.item}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{test.steps}</td>
                      <td className="px-3 py-2.5 text-text-secondary">{test.expected}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 4: Functional Tests */}
        <section id="functional" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-2">4. 機能別テスト（60-90分）</h2>
          <p className="text-text-secondary text-sm mb-4">
            各機能ごとの詳細テストです。セクションをクリックして展開してください。
          </p>
          <div className="space-y-2">
            {functionalSections.map((section) => (
              <AccordionSection
                key={section.id}
                title={section.title}
                description={section.description}
                points={section.points}
              />
            ))}
          </div>
        </section>

        {/* Section 5: Edge Cases */}
        <section id="edge" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-2">5. エッジケーステスト（30-40分）</h2>
          <p className="text-text-secondary text-sm mb-4">
            通常フロー以外の操作で問題が起きないか確認します。
          </p>
          <div className="rpg-frame rounded-lg p-5">
            <ol className="space-y-2">
              {edgeCases.map((item, i) => (
                <li key={i} className="text-text-secondary text-sm flex items-start gap-3">
                  <span className="text-fire font-mono font-bold min-w-[2rem]">E-{String(i + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Section 6: Bug Report Template */}
        <section id="bug-report" className="mb-10 scroll-mt-20">
          <h2 className="text-xl font-bold text-gold mb-2">6. バグ報告テンプレート</h2>
          <p className="text-text-secondary text-sm mb-4">
            バグを発見した際は、以下のテンプレートを使って報告してください。
          </p>
          <div className="rpg-frame rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gold font-bold text-sm">報告テンプレート</span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-text-secondary hover:text-gold text-xs transition-colors border border-border-rpg/30 rounded px-2.5 py-1"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    コピー済み
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    テンプレートをコピー
                  </>
                )}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  {[
                    { label: "バグ発生日時", placeholder: "例: 2026/04/12 14:30" },
                    { label: "発生環境", placeholder: "ブラウザ / OS / デバイス" },
                    { label: "再現手順", placeholder: "1. ... 2. ... 3. ..." },
                    { label: "期待される結果", placeholder: "本来どうなるべきか" },
                    { label: "実際の結果", placeholder: "実際に何が起きたか" },
                    { label: "スクリーンショット", placeholder: "あり / なし" },
                    { label: "緊急度", placeholder: "高 / 中 / 低" },
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-border-rpg/20 ${i % 2 === 1 ? "bg-bg-card/50" : ""}`}
                    >
                      <td className="py-2.5 pr-4 text-gold font-bold whitespace-nowrap text-sm">{row.label}</td>
                      <td className="py-2.5 text-text-secondary/60 text-sm">{row.placeholder}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border-rpg/30 pt-6 mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/"
              className="text-text-secondary hover:text-gold text-sm inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              トップへ戻る
            </Link>
            <p className="text-text-secondary text-xs">
              最終更新日: 2026年4月12日
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
