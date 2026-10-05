-- A salted password hash overrides the initial environment password after an admin changes it.
CREATE TABLE admin_password (
  singleton boolean PRIMARY KEY DEFAULT true CHECK (singleton = true),
  password_hash text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
