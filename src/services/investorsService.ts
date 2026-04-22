import {
	getAllInvestors,
	getInvestor,
	insertInvestor,
} from "../repositories/investorsRepository.js";
import type { CreateInvestorReqBody } from "../schemas/investorSchema.js";
import type { Investor } from "../types.js";

export const getInvestors = async (): Promise<Investor[]> => {
	return await getAllInvestors();
};

export const getInvestorById = async (id: string): Promise<Investor | null> => {
	return await getInvestor(id);
};

export const createInvestor = async (
	investor: CreateInvestorReqBody,
): Promise<Investor> => {
	return await insertInvestor(investor);
};
