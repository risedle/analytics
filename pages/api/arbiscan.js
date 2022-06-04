// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import CoinGecko from "coingecko-api";
const CoinGeckoClient = new CoinGecko();

export default async function handler(req, res) {
	// let { data } = await CoinGeckoClient.ping();
	// https://api.coingecko.com/api/v3/ping
	let result = [];
	let lastLength = 1000;
	let fromBlock = 1;
	while (lastLength >= 1000) {
		const { data } = await axios(
			`https://api.arbiscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=latest&address=0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94&topic0=0xede1f310f6f94790fc59194108fa63c31d34618eb55c66f142a8eb2088770c4c&apikey=D1W9N8EKUAVY4AK67A7GV5A8QA9KCQ6V2W`
		);
		lastLength = data.result.length;
		if (lastLength === 0) break;
		result = [...result, ...data.result];
		fromBlock = parseInt(
			data.result[data.result.length - 1].blockNumber,
			16
		);
	}
	res.status(200).json(result);
}
