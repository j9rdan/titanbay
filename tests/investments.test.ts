import request from "supertest";
import app from "../src/app.js";

const validFund = {
	name: "Test Fund",
	vintage_year: 2024,
	target_size_usd: 1000000,
	status: "Fundraising",
};

const validInvestor = {
	name: "Test Investor",
	investor_type: "Institution",
	email: "test@example.com",
};

describe("GET /funds/:fund_id/investments", () => {
	it("returns empty array when fund has no investments", async () => {
		const fund = await request(app).post("/funds").send(validFund);

		const res = await request(app).get(
			`/funds/${fund.body.id}/investments`,
		);

		expect(res.status).toBe(200);
		expect(res.body).toEqual([]);
	});

	it("returns investments for a fund", async () => {
		const fund = await request(app).post("/funds").send(validFund);
		const investor = await request(app)
			.post("/investors")
			.send(validInvestor);

		await request(app).post(`/funds/${fund.body.id}/investments`).send({
			investor_id: investor.body.id,
			amount_usd: 50000,
			investment_date: "2024-03-15",
		});

		const res = await request(app).get(
			`/funds/${fund.body.id}/investments`,
		);

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].amount_usd).toBe("50000.00"); // PostgreSQL returns decimal as string to preserve precision
	});

	it("returns 404 for valid UUID not in database", async () => {
		const res = await request(app).get(
			"/funds/550e8400-e29b-41d4-a716-446655440000/investments",
		);

		expect(res.status).toBe(404);
	});

	it("returns 400 for an invalid UUID", async () => {
		const res = await request(app).get("/funds/invalid-uuid/investments");

		expect(res.status).toBe(400);
	});
});

describe("POST /funds/:fund_id/investments", () => {
	it("creates a valid investment and returns 201", async () => {
		const fund = await request(app).post("/funds").send(validFund);
		const investor = await request(app)
			.post("/investors")
			.send(validInvestor);

		const res = await request(app)
			.post(`/funds/${fund.body.id}/investments`)
			.send({
				investor_id: investor.body.id,
				amount_usd: 50000,
				investment_date: "2024-03-15",
			});

		expect(res.status).toBe(201);
		expect(res.body.amount_usd).toBe("50000.00");
		expect(res.body.id).toBeDefined();
	});

	it("returns 404 for valid fund UUID not in database", async () => {
		const investor = await request(app)
			.post("/investors")
			.send(validInvestor);

		const res = await request(app)
			.post("/funds/550e8400-e29b-41d4-a716-446655440000/investments")
			.send({
				investor_id: investor.body.id,
				amount_usd: 50000,
				investment_date: "2024-03-15",
			});

		expect(res.status).toBe(404);
	});

	it("returns 404 for valid investor UUID not in database", async () => {
		const fund = await request(app).post("/funds").send(validFund);

		const res = await request(app)
			.post(`/funds/${fund.body.id}/investments`)
			.send({
				investor_id: "550e8400-e29b-41d4-a716-446655440000",
				amount_usd: 50000,
				investment_date: "2024-03-15",
			});

		expect(res.status).toBe(404);
	});

	it("returns 400 for an invalid fund UUID", async () => {
		const res = await request(app)
			.post("/funds/invalid-uuid/investments")
			.send({
				investor_id: "550e8400-e29b-41d4-a716-446655440000",
				amount_usd: 50000,
				investment_date: "2024-03-15",
			});

		expect(res.status).toBe(400);
	});

	it("returns 400 for missing required fields", async () => {
		const fund = await request(app).post("/funds").send(validFund);

		const res = await request(app)
			.post(`/funds/${fund.body.id}/investments`)
			.send({
				investor_id: undefined,
				amount_usd: 50000,
				investment_date: undefined,
			});

		expect(res.status).toBe(400);
	});

	it("returns 400 for zero or negative amount_usd", async () => {
		const fund = await request(app).post("/funds").send(validFund);
		const investor = await request(app)
			.post("/investors")
			.send(validInvestor);

		const res = await request(app)
			.post(`/funds/${fund.body.id}/investments`)
			.send({
				investor_id: investor.body.id,
				amount_usd: 0,
				investment_date: "2024-03-15",
			});

		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid date format", async () => {
		const fund = await request(app).post("/funds").send(validFund);
		const investor = await request(app)
			.post("/investors")
			.send(validInvestor);

		const res = await request(app)
			.post(`/funds/${fund.body.id}/investments`)
			.send({
				investor_id: investor.body.id,
				amount_usd: 50000,
				investment_date: "not-a-date",
			});

		expect(res.status).toBe(400);
	});
});
