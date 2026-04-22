import type { Request, Response, NextFunction } from "express";
import {
	createInvestmentSchema,
	investmentsParamsSchema,
} from "../schemas/investmentSchema.js";
import {
	createInvestment,
	getInvestmentsByFundId,
} from "../services/investmentsService.js";

export const getInvestmentsInFundController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { fund_id } = investmentsParamsSchema.parse(req.params);
		const investments = await getInvestmentsByFundId(fund_id);
		res.status(200).json(investments);
	} catch (err) {
		next(err);
	}
};

export const createInvestmentInFundController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { fund_id } = investmentsParamsSchema.parse(req.params);
		const body = createInvestmentSchema.parse(req.body);
		const investment = await createInvestment(fund_id, body);
		res.status(201).json(investment);
	} catch (err) {
		next(err);
	}
};
