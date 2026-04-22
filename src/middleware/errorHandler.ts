import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors.js";
import { ZodError } from "zod";

// Type guard to safely access PostgreSQL error codes on unknown errors
const isDbError = (err: unknown): err is { code: string } => {
	return typeof err === "object" && err !== null && "code" in err;
};

export const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	if (err instanceof ZodError) {
		res.status(400).json({ error: err.issues });
		return;
	}
	if (err instanceof NotFoundError) {
		res.status(404).json({ error: err.message });
		return;
	}

	if (isDbError(err) && "23505" === err.code) {
		// PostgreSQL unique violation error code
		res.status(409).json({
			error: "A record with this value already exists",
		});
		return;
	}

	res.status(500).json({ error: "Internal server error" });
};
