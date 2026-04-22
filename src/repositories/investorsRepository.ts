import { pool } from "../db/pool.js";
import type { CreateInvestorReqBody } from "../schemas/investorSchema.js";
import type { Investor } from "../types.js";

export const getAllInvestors = async (): Promise<Investor[]> => {
	const result = await pool.query("SELECT * FROM investors");
	return result.rows as Investor[];
};

export const getInvestor = async (id: string): Promise<Investor | null> => {
	const result = await pool.query("SELECT * FROM investors WHERE id = $1", [
		id,
	]);
	return (result.rows[0] as Investor) ?? null;
};

export const insertInvestor = async (
	investor: CreateInvestorReqBody,
): Promise<Investor> => {
	const result = await pool.query(
		"INSERT INTO investors (name, investor_type, email) VALUES ($1, $2, $3) RETURNING *",
		[investor.name, investor.investor_type, investor.email],
	);
	return result.rows[0] as Investor;
};
