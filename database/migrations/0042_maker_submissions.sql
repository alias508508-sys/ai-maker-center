-- Private administrator submissions; only the publisher exports public content.
CREATE TABLE maker_submissions (
  id text PRIMARY KEY,
  request_key text NOT NULL UNIQUE,
  payload jsonb NOT NULL,
  status text NOT NULL DEFAULT 'queued' CHECK (status IN ('queued','processing','published','failed')),
  article_id text REFERENCES articles(id),
  result_url text,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
