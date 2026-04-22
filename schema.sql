DROP TABLE IF EXISTS investments;
DROP TABLE IF EXISTS investors;
DROP TABLE IF EXISTS funds;
DROP TYPE IF EXISTS fund_status;
DROP TYPE IF EXISTS investor_type_enum;

CREATE TYPE "fund_status" AS ENUM (
  'Fundraising',
  'Investing',
  'Closed'
);

CREATE TYPE "investor_type_enum" AS ENUM (
  'Individual',
  'Institution',
  'Family Office'
);

CREATE TABLE "funds" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "vintage_year" integer NOT NULL,
  "target_size_usd" decimal(18,2) NOT NULL CHECK (target_size_usd >= 0),
  "status" fund_status NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "investors" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "investor_type" investor_type_enum NOT NULL,
  "email" varchar UNIQUE NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "investments" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "investor_id" uuid NOT NULL REFERENCES investors(id),
  "fund_id" uuid NOT NULL REFERENCES funds(id),
  "amount_usd" decimal(18,2) NOT NULL CHECK (amount_usd > 0),
  "investment_date" date NOT NULL,
  "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE INDEX ON "investments" ("fund_id");
CREATE INDEX ON "investments" ("investor_id");