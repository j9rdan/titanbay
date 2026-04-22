import { z } from "zod";

export const getFundByIdSchema = z.object({
	id: z.uuid(),
});

export const createFundSchema = z.object({
	name: z.string().nonempty(),
	vintage_year: z.number().int(),
	target_size_usd: z.number().min(0),
	status: z.enum(["Fundraising", "Investing", "Closed"]),
});

export type CreateFundReqBody = z.infer<typeof createFundSchema>;

export const updateFundSchema = createFundSchema.extend({
	id: z.uuid(),
});

export type UpdateFundReqBody = z.infer<typeof updateFundSchema>;
