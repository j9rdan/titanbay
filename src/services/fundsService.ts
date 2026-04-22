import { NotFoundError } from "../errors.js";
import {
	getFund,
	getAllFunds,
	insertFund,
	updateFund,
} from "../repositories/fundsRepository.js";
import type {
	CreateFundReqBody,
	UpdateFundReqBody,
} from "../schemas/fundSchema.js";
import type { Fund } from "../types.js";

export const getFunds = async (): Promise<Fund[]> => {
	return await getAllFunds();
};

export const getFundById = async (id: string): Promise<Fund> => {
	const fund = await getFund(id);
	if (!fund) throw new NotFoundError("Fund not found");
	return fund;
};

export const createFund = async (fund: CreateFundReqBody): Promise<Fund> => {
	return await insertFund(fund);
};

export const modifyFund = async (fund: UpdateFundReqBody): Promise<Fund> => {
	const updatedFund = await updateFund(fund);
	if (!updatedFund) throw new NotFoundError("Fund not found");
	return updatedFund;
};
