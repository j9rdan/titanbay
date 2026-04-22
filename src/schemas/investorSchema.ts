import { z } from "zod";

export const createInvestorSchema = z.object({
	name: z.string().nonempty(),
	investor_type: z.enum(["Individual", "Institution", "Family Office"]),
	email: z.email(),
});

export type CreateInvestorReqBody = z.infer<typeof createInvestorSchema>;
