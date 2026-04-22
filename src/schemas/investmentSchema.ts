import { z } from "zod";

export const investmentsParamsSchema = z.object({
	fund_id: z.uuid(),
});

export const createInvestmentSchema = z.object({
	investor_id: z.uuid(),
	amount_usd: z.number().positive(),
	investment_date: z.iso.date(),
});

export type CreateInvestmentReqBody = z.infer<typeof createInvestmentSchema>;
