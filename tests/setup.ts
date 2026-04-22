import { pool } from "./pool.js";
import fs from "fs";
import path from "path";

beforeAll(async () => {
	const schema = fs.readFileSync(
		path.join(process.cwd(), "schema.sql"),
		"utf8",
	);
	await pool.query(schema);
});

afterEach(async () => {
	await pool.query("DELETE FROM investments");
	await pool.query("DELETE FROM investors");
	await pool.query("DELETE FROM funds");
});

afterAll(async () => {
	await pool.end();
});
