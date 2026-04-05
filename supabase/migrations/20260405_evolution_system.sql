-- Step 0: ABILITY DIAGNOSIS DB マイグレーション
-- 進化システム・日誌ストリーク・EXP/ポイント分離対応
-- 実行日: 2026-04-05
-- =============================================

-- 1. user_gamification に日誌ストリーク・進化管理カラム追加
ALTER TABLE user_gamification
  ADD COLUMN IF NOT EXISTS journal_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS longest_journal_streak integer DEFAULT 0,
  ADD COLUMN IF NOT EXISTS last_journal_date date,
  ADD COLUMN IF NOT EXISTS current_job_id text,
  ADD COLUMN IF NOT EXISTS job_tier text DEFAULT 'basic';

-- 2. 進化履歴テーブル作成
CREATE TABLE IF NOT EXISTS user_evolutions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  from_job_id text NOT NULL,
  to_job_id text NOT NULL,
  trigger_type text NOT NULL CHECK (trigger_type IN ('level_up', 'rediagnosis')),
  evolved_at timestamptz DEFAULT now(),
  exp_awarded integer DEFAULT 0,
  points_awarded integer DEFAULT 0
);

-- 3. RLSポリシー
ALTER TABLE user_evolutions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own evolutions" ON user_evolutions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own evolutions" ON user_evolutions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. 既存ユーザーのcurrent_job_idを最新診断結果から設定
UPDATE user_gamification g
SET current_job_id = d.primary_job_id
FROM diagnosis_results d
WHERE d.user_id = g.user_id
  AND d.is_latest = true
  AND g.current_job_id IS NULL;
