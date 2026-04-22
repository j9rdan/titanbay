import { NotFoundError } from "../errors.js";
import {
	findInvestmentsByFundId,
	insertInvestment,
} from "../repositories/investmentsRepository.js";
import type { CreateInvestmentReqBody } from "../schemas/investmentSchema.js";
import type { Investment } from "../types.js";
import { getFundById } from "./fundsService.js";
import { getInvestorById } from "./investorsService.js";

export const getInvestmentsByFundId = async (
	fundId: string,
): Promise<Investment[]> => {
	const fund = await getFundById(fundId);
	if (!fund) throw new NotFoundError("Fund not found");

	return await findInvestmentsByFundId(fundId);
};

export const createInvestment = async (
	fundId: string,
	investment: CreateInvestmentReqBody,
): Promise<Investment> => {
	const fund = await getFundById(fundId);
	if (!fund) throw new NotFoundError("Fund not found");

	const investor = await getInvestorById(investment.investor_id);
	if (!investor) throw new NotFoundError("Investor not found");

	return await insertInvestment(fundId, investment);
};
