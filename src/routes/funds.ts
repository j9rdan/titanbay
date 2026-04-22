import { Router } from "express";
import {
	createFundController,
	getAllFundsController,
	getFundByIdController,
	updateFundController,
} from "../controllers/fundsController.js";

export const fundsRouter = Router();

fundsRouter.get("/", getAllFundsController);
fundsRouter.get("/:id", getFundByIdController);

fundsRouter.post("/", createFundController);

fundsRouter.put("/", updateFundController);
