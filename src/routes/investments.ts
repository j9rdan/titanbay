import { Router } from "express";
import {
	createInvestmentInFundController,
	getInvestmentsInFundController,
} from "../controllers/investmentsController.js";

export const investmentsRouter = Router();

investmentsRouter.get("/:fund_id/investments", getInvestmentsInFundController);

investmentsRouter.post(
	"/:fund_id/investments",
	createInvestmentInFundController,
);
