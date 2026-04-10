-- =============================================
-- Track System Migration: Split into Business (job) + Love tracks
-- 実行日: 2026-04-08
-- =============================================
-- Goal: Support 2 sub-products (Business Quest / Love Quest) under one account
-- Strategy: Add `track` column to all per-user-state tables, allow per-track rows

-- ---------------------------------------------
-- 1. diagnosis_results: add track column
-- ---------------------------------------------
ALTER TABLE diagnosis_results
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'job'
    CHECK (track IN ('job', 'love'));

-- Recreate is_latest index scoped to (user_id, track)
DROP INDEX IF EXISTS diagnosis_results_user_latest_idx;
CREATE UNIQUE INDEX IF NOT EXISTS diagnosis_results_user_track_latest_idx
  ON diagnosis_results (user_id, track)
  WHERE is_latest = true;

-- ---------------------------------------------
-- 2. user_gamification: drop active_mode, add track, per-track unique
-- ---------------------------------------------
ALTER TABLE user_gamification DROP COLUMN IF EXISTS active_mode;

ALTER TABLE user_gamification
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'job'
    CHECK (track IN ('job', 'love'));

-- Drop old unique constraint if any, add (user_id, track)
ALTER TABLE user_gamification DROP CONSTRAINT IF EXISTS user_gamification_user_id_key;
ALTER TABLE user_gamification DROP CONSTRAINT IF EXISTS user_gamification_user_track_key;
ALTER TABLE user_gamification
  ADD CONSTRAINT user_gamification_user_track_key UNIQUE (user_id, track);

-- ---------------------------------------------
-- 3. user_evolutions: add track
-- ---------------------------------------------
ALTER TABLE user_evolutions
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'job'
    CHECK (track IN ('job', 'love'));

-- ---------------------------------------------
-- 4. user_badges: add track + unique
-- ---------------------------------------------
ALTER TABLE user_badges
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'job'
    CHECK (track IN ('job', 'love'));

ALTER TABLE user_badges DROP CONSTRAINT IF EXISTS user_badges_user_id_badge_id_key;
ALTER TABLE user_badges DROP CONSTRAINT IF EXISTS user_badges_user_track_badge_key;
ALTER TABLE user_badges
  ADD CONSTRAINT user_badges_user_track_badge_key UNIQUE (user_id, track, badge_id);

-- ---------------------------------------------
-- 5. user_journals: track field (shared by default)
-- ---------------------------------------------
ALTER TABLE user_journals
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'shared'
    CHECK (track IN ('job', 'love', 'shared'));

-- ---------------------------------------------
-- 6. user_activity_log: add track
-- ---------------------------------------------
ALTER TABLE user_activity_log
  ADD COLUMN IF NOT EXISTS track text NOT NULL DEFAULT 'job'
    CHECK (track IN ('job', 'love'));

-- ---------------------------------------------
-- 7. record_activity RPC with track support
-- ---------------------------------------------
CREATE OR REPLACE FUNCTION record_activity(
  p_user_id uuid,
  p_activity_type text,
  p_points integer DEFAULT 0,
  p_exp integer DEFAULT 0,
  p_metadata jsonb DEFAULT NULL,
  p_track text DEFAULT 'job'
) RETURNS void AS $$
BEGIN
  INSERT INTO user_activity_log (user_id, activity_type, points_earned, exp_earned, metadata, track)
  VALUES (p_user_id, p_activity_type, p_points, p_exp, p_metadata, p_track);

  UPDATE user_gamification
  SET total_exp = total_exp + p_exp,
      current_exp = current_exp + p_exp,
      points = points + p_points,
      updated_at = now()
  WHERE user_id = p_user_id AND track = p_track;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ---------------------------------------------
-- 8. Ensure all existing users have both track rows
-- ---------------------------------------------
INSERT INTO user_gamification (user_id, track)
  SELECT id, 'job' FROM auth.users
  ON CONFLICT (user_id, track) DO NOTHING;

INSERT INTO user_gamification (user_id, track)
  SELECT id, 'love' FROM auth.users
  ON CONFLICT (user_id, track) DO NOTHING;
