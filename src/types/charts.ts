export type TimeframeType = "daily" | "weekly" | "monthly" | "3months";
export type RiseSnapshotType = {
	timestamp: string;
	collateral_per_leveraged_token: number;
	debt_per_leveraged_token: number;
	leverage_ratio: number;
	nav: number;
	block_number: number;
};
export type CoinGeckoMarketChartType = {
	prices: [number, number][];
	market_caps: [number, number][];
	total_volumes: [number, number][];
};
