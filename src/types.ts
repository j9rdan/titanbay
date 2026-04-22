export type Fund = {
	id: string;
	name: string;
	vintage_year: number;
	target_size_usd: number;
	status: "Fundraising" | "Investing" | "Closed";
	created_at: Date;
};

export type Investor = {
	id: string;
	name: string;
	investor_type: "Individual" | "Institution" | "Family Office";
	email: string;
	created_at: Date;
};

export type Investment = {
	id: string;
	investor_id: string;
	fund_id: string;
	amount_usd: number;
	investment_date: string;
	created_at: Date;
};