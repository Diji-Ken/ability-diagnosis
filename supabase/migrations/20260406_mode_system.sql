-- Step 0: モード切替対応マイグレーション
-- ビジネス/恋愛モードの保存
-- 実行日: 2026-04-06
-- =============================================

ALTER TABLE user_gamification
  ADD COLUMN IF NOT EXISTS active_mode text DEFAULT 'business';
