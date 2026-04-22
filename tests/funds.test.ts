import request from "supertest";
import app from "../src/app.js";

describe("GET /funds", () => {
	it("returns empty array when no funds exist", async () => {
		const res = await request(app).get("/funds");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([]);
	});

	it("returns all funds", async () => {
		// Create a fund first
		await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 1000000,
			status: "Fundraising",
		});

		const res = await request(app).get("/funds");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].name).toBe("Test Fund");
	});
});

describe("GET /funds/:id", () => {
	it("returns a fund by a valid UUID in database", async () => {
		const created = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 1000000,
			status: "Fundraising",
		});

		const res = await request(app).get(`/funds/${created.body.id}`);

		expect(res.status).toBe(200);
		expect(res.body.id).toBe(created.body.id);
	});

	it("returns 404 for a valid UUID not in database", async () => {
		const res = await request(app).get(
			"/funds/550e8400-e29b-41d4-a716-446655440000",
		);

		expect(res.status).toBe(404);
	});

	it("returns 400 for an invalid UUID", async () => {
		const res = await request(app).get("/funds/not-a-uuid");

		expect(res.status).toBe(400);
	});
});

describe("POST /funds", () => {
	it("creates a valid fund and returns 201", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 1000000,
			status: "Fundraising",
		});

		expect(res.status).toBe(201);
		expect(res.body.name).toBe("Test Fund");
		expect(res.body.id).toBeDefined();
	});

	it("returns 400 if target_size_usd is negative", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: -1000000,
			status: "Fundraising",
		});

		expect(res.status).toBe(400);
	});

	it("returns 201 for valid target_size_usd of zero", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 0,
			status: "Fundraising",
		});

		expect(res.status).toBe(201);
	});

	it("returns 400 for missing required fields", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: undefined,
			target_size_usd: undefined,
			status: undefined,
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid field types", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: "NaN",
			target_size_usd: 2024,
			status: "Fundraising",
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid status value", async () => {
		const res = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 1000000,
			status: "InvalidStatus",
		});

		expect(res.status).toBe(400);
	});
});

describe("PUT /funds", () => {
	it("updates a fund and returns 200", async () => {
		const created = await request(app).post("/funds").send({
			name: "Test Fund",
			vintage_year: 2024,
			target_size_usd: 1000000,
			status: "Fundraising",
		});

		const res = await request(app).put("/funds").send({
			id: created.body.id,
			name: "Updated Fund",
			vintage_year: 2024,
			target_size_usd: 2000000,
			status: "Investing",
		});

		expect(res.status).toBe(200);
		expect(res.body.name).toBe("Updated Fund");
		expect(res.body.status).toBe("Investing");
	});

	it("returns 400 for missing id", async () => {
		const res = await request(app).put("/funds").send({
			id: undefined,
			name: "Updated Fund",
			vintage_year: 2024,
			target_size_usd: 2000000,
			status: "Investing",
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for an invalid UUID", async () => {
		const res = await request(app).put("/funds").send({
			id: "invalid-uuid",
			name: "Updated Fund",
			vintage_year: 2024,
			target_size_usd: 2000000,
			status: "Investing",
		});

		expect(res.status).toBe(400);
	});

	it("returns 404 for valid UUID not in database", async () => {
		const res = await request(app).put("/funds").send({
			id: "550e8400-e29b-41d4-a716-446655440000",
			name: "Updated Fund",
			vintage_year: 2024,
			target_size_usd: 2000000,
			status: "Investing",
		});

		expect(res.status).toBe(404);
	});
});
