import express from "express";
import { fundsRouter } from "./routes/funds.js";
import { investorsRouter } from "./routes/investors.js";
import { investmentsRouter } from "./routes/investments.js";
import { pool } from "./db/pool.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/funds", fundsRouter, investmentsRouter);
app.use("/investors", investorsRouter);

app.get("/health", async (_req, res) => {
	const result = await pool.query("SELECT 1 as ok");
	res.json({ status: "ok", db: result.rows[0].ok === 1 });
});

app.use(errorHandler);

export default app;
