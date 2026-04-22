import { pool } from "../db/pool.js";
import type {
	CreateFundReqBody,
	UpdateFundReqBody,
} from "../schemas/fundSchema.js";
import type { Fund } from "../types.js";

export const getAllFunds = async (): Promise<Fund[]> => {
	const result = await pool.query("SELECT * FROM funds");
	return result.rows as Fund[];
};

export const getFund = async (id: string): Promise<Fund | null> => {
	const result = await pool.query("SELECT * FROM funds WHERE id = $1", [id]);
	return (result.rows[0] as Fund) ?? null;
};

export const insertFund = async (fund: CreateFundReqBody): Promise<Fund> => {
	const result = await pool.query(
		"INSERT INTO funds (name, vintage_year, target_size_usd, status) VALUES ($1, $2, $3, $4) RETURNING *",
		[fund.name, fund.vintage_year, fund.target_size_usd, fund.status],
	);
	return result.rows[0] as Fund;
};

export const updateFund = async (
	fund: UpdateFundReqBody,
): Promise<Fund | null> => {
	const result = await pool.query(
		"UPDATE funds SET name = $1, vintage_year = $2, target_size_usd = $3, status = $4 WHERE id = $5 RETURNING *",
		[
			fund.name,
			fund.vintage_year,
			fund.target_size_usd,
			fund.status,
			fund.id,
		],
	);
	return (result.rows[0] as Fund) ?? null;
};
