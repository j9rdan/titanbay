import "dotenv/config";
import { Pool } from "pg";

export const pool = new Pool({
	connectionString: process.env.TEST_DATABASE_URL,
});
