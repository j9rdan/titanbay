import request from "supertest";
import app from "../src/app.js";

describe("GET /investors", () => {
	it("returns empty array when no investors exist", async () => {
		const res = await request(app).get("/investors");

		expect(res.status).toBe(200);
		expect(res.body).toEqual([]);
	});

	it("returns all investors", async () => {
		// Create an investor first
		await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: "Individual",
			email: "test@example.com",
		});

		const res = await request(app).get("/investors");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(1);
		expect(res.body[0].name).toBe("Test Investor");
	});
});

describe("POST /investors", () => {
	it("creates a valid investor and returns 201", async () => {
		const res = await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: "Individual",
			email: "test@example.com",
		});

		expect(res.status).toBe(201);
		expect(res.body.name).toBe("Test Investor");
		expect(res.body.id).toBeDefined();
	});

	it("returns 409 for duplicate email", async () => {
		const created = await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: "Individual",
			email: "test@example.com",
		});

		const res = await request(app).post("/investors").send({
			name: "Another Investor",
			investor_type: "Individual",
			email: created.body.email,
		});

		expect(res.status).toBe(409);
	});

	it("returns 400 for empty name", async () => {
		const res = await request(app).post("/investors").send({
			name: "",
			investor_type: "Individual",
			email: "test@example.com",
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid email", async () => {
		const res = await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: "Individual",
			email: "invalid-email",
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for invalid investor type", async () => {
		const res = await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: "InvalidType",
			email: "test@example.com",
		});

		expect(res.status).toBe(400);
	});

	it("returns 400 for missing required fields", async () => {
		const res = await request(app).post("/investors").send({
			name: "Test Investor",
			investor_type: undefined,
			email: "test@example.com",
		});

		expect(res.status).toBe(400);
	});
});
