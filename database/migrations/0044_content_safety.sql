CREATE TABLE content_safety_reviews (
  input_hash text PRIMARY KEY,
  policy_version text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('text', 'image')),
  status text NOT NULL CHECK (status IN ('pass', 'blocked', 'retry')),
  labels text[] NOT NULL DEFAULT '{}',
  attempts integer NOT NULL DEFAULT 0,
  receipt_ids bigint[] NOT NULL DEFAULT '{}',
  next_retry_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO budgets (service, per_minute, per_hour, per_day, note)
VALUES ('content-safety', 60, 1000, 10000, '专业内容安全审核；文字和图片按调用收费') ON CONFLICT (service) DO NOTHING;

ALTER TABLE publications ADD COLUMN safety_approved boolean NOT NULL DEFAULT false;
