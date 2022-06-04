// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";

function hexToBigInt(s) {
	function add(x, y) {
		var c = 0,
			r = [];
		var x = x.split("").map(Number);
		var y = y.split("").map(Number);
		while (x.length || y.length) {
			var s = (x.pop() || 0) + (y.pop() || 0) + c;
			r.unshift(s < 10 ? s : s - 10);
			c = s < 10 ? 0 : 1;
		}
		if (c) r.unshift(c);
		return r.join("");
	}

	var dec = "0";
	s.split("").forEach(function (chr) {
		var n = parseInt(chr, 16);
		for (var t = 8; t; t >>= 1) {
			dec = add(dec, dec);
			if (n & t) dec = add(dec, "1");
		}
	});
	return dec;
}

function paddedToChecksumAddress(address) {
	if (address.slice(0, 2) === "0x") address = address.slice(2);
	while (address.slice(0, 2) === "00") address = address.slice(2);
	return "0x" + address;
}

export default async function handler(req, res) {
	let result = [];
	let lastLength = 1000;
	let fromBlock = 1;
	while (lastLength >= 1000) {
		/// TODO: masih belum difilter RISE token yang mana
		const { data } = await axios(
			`https://api.arbiscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=latest&address=0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94&topic0=0xede1f310f6f94790fc59194108fa63c31d34618eb55c66f142a8eb2088770c4c&apikey=${process.env.API_KEY}`
		);
		lastLength = data.result.length;
		if (lastLength === 0) break;
		result = [...result, ...data.result];
		fromBlock = parseInt(
			data.result[data.result.length - 1].blockNumber,
			16
		);
	}
	const realResult = result.map((item) => {
		const transactionHash = item.transactionHash;
		const timestamp = parseInt(item.timeStamp, 16);
		const minter = paddedToChecksumAddress(item.topics[1]);
		const mintAmount = parseInt(hexToBigInt(item.data)) / 10 ** 18;

		return { transactionHash, timestamp, mintAmount, minter };
	});
	res.status(200).json(realResult);
}

/**

{"address":"0xf7edb240dbf7bbed7d321776afe87d1fbcfd0a94","topics":["0xede1f310f6f94790fc59194108fa63c31d34618eb55c66f142a8eb2088770c4c","0x00000000000000000000000017ae0a6be2e97b384165626db2569729d5006640","0x00000000000000000000000046d06cf8052ea6fdbf71736af33ed23686ea1452"],"data":"0x0000000000000000000000000000000000000000000000000057d1ac158d7800","blockNumber":"0x4f09e5","timeStamp":"0x61f43ce5","gasPrice":"0x5dd15524","gasUsed":"0xdf412","logIndex":"0xe","transactionHash":"0xed5c34279cdfc0393b8499eb92ef69953db2e1d8bbfb5406578d895d9036c33f","transactionIndex":"0x"},

 */
