import { Router } from "express";
import {
	createInvestorController,
	getAllInvestorsController,
} from "../controllers/investorsController.js";

export const investorsRouter = Router();

investorsRouter.get("/", getAllInvestorsController);

investorsRouter.post("/", createInvestorController);
