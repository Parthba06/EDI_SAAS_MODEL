// server/db.js
// PostgreSQL connection (Supabase) using the `postgres` client

const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;

// For Supabase, make sure DATABASE_URL is the pooled or direct URL they provide.
// Example (do NOT commit your real password):
// DATABASE_URL=postgresql://postgres.[ref]:[PASSWORD]@aws-1-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true

const sql = postgres(connectionString, {
  ssl: "require",
});

module.exports = sql;
