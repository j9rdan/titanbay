import type { Request, Response, NextFunction } from "express";
import { createInvestor, getInvestors } from "../services/investorsService.js";
import { createInvestorSchema } from "../schemas/investorSchema.js";

export const getAllInvestorsController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const investors = await getInvestors();
		res.status(200).json(investors);
	} catch (error) {
		next(error);
	}
};

export const createInvestorController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const body = createInvestorSchema.parse(req.body);
		const investor = await createInvestor(body);
		res.status(201).json(investor);
	} catch (error) {
		next(error);
	}
};
