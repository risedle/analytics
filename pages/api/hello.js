// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CoinGecko from "coingecko-api";
const CoinGeckoClient = new CoinGecko();

export default async function handler(req, res) {
	// let { data } = await CoinGeckoClient.ping();
	const { data } = await CoinGeckoClient.coins.fetchMarketChart(
		"eth-2x-flexible-leverage-index",
		{ days: "max" }
	);
	res.status(200).json({ name: "John Doe", price: data.prices });
}
