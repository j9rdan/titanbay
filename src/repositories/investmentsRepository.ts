import { pool } from "../db/pool.js";
import type { CreateInvestmentReqBody } from "../schemas/investmentSchema.js";
import type { Investment } from "../types.js";

export const findInvestmentsByFundId = async (
	fundId: string,
): Promise<Investment[]> => {
	const result = await pool.query(
		"SELECT * FROM investments WHERE fund_id = $1",
		[fundId],
	);
	return result.rows as Investment[];
};

export const insertInvestment = async (
	fundId: string,
	investment: CreateInvestmentReqBody,
): Promise<Investment> => {
	const result = await pool.query(
		"INSERT INTO investments (investor_id, fund_id, amount_usd, investment_date) VALUES ($1, $2, $3, $4) RETURNING *",
		[
			investment.investor_id,
			fundId,
			investment.amount_usd,
			investment.investment_date,
		],
	);
	return result.rows[0] as Investment;
};
