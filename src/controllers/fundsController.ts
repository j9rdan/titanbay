import {
	createFundSchema,
	getFundByIdSchema,
	updateFundSchema,
} from "../schemas/fundSchema.js";
import {
	createFund,
	getFundById,
	getFunds,
	modifyFund,
} from "../services/fundsService.js";
import type { Request, Response, NextFunction } from "express";

export const getAllFundsController = async (
	_req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const funds = await getFunds();
		res.status(200).json(funds);
	} catch (error) {
		next(error);
	}
};

export const getFundByIdController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = getFundByIdSchema.parse(req.params);
		const fund = await getFundById(id);
		res.status(200).json(fund);
	} catch (error) {
		next(error);
	}
};

export const createFundController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const body = createFundSchema.parse(req.body);
		const fund = await createFund(body);
		res.status(201).json(fund);
	} catch (error) {
		next(error);
	}
};

export const updateFundController = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const body = updateFundSchema.parse(req.body);
		const fund = await modifyFund(body);
		res.status(200).json(fund);
	} catch (error) {
		next(error);
	}
};
