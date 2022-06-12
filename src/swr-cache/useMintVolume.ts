import moment from "moment";
import axios from "axios";
import { useState, useEffect } from "react";

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

export function useMintVolume() {
	// const { data: minterData, error: minterError } = useSWR(
	// 	`/api/minter`,
	// 	fetcher
	// );
	const [result, setResult] = useState([]);
	const [lastLength, setLastLength] = useState(0);
	const [fromBlock, setFromBlock] = useState(1);

	useEffect(() => {
		axios(
			`https://api.arbiscan.io/api?module=logs&action=getLogs&fromBlock=${fromBlock}&toBlock=latest&address=0xf7EDB240DbF7BBED7D321776AFe87D1FBcFD0A94&topic0=0xede1f310f6f94790fc59194108fa63c31d34618eb55c66f142a8eb2088770c4c&apikey=${process.env.API_KEY}`
		).then(({ data }) => {
			setLastLength(data.result.length);
			if (lastLength > 0) {
				setResult((result) => [...result, ...data.result]);
				setFromBlock(
					parseInt(
						data.result[data.result.length - 1].blockNumber,
						16
					)
				);
			}
		});
	}, [lastLength, fromBlock]);

	const minterData = result.map((item) => {
		const transactionHash = item.transactionHash;
		const timestamp = parseInt(item.timeStamp, 16);
		const minter = paddedToChecksumAddress(item.topics[1]);
		const mintAmount = parseInt(hexToBigInt(item.data)) / 10 ** 18;

		return { transactionHash, timestamp, mintAmount, minter };
	});

	const mintAmountGroupByDate = {};
	minterData?.forEach((item) => {
		const day = moment.unix(item.timestamp).format("YYYY-MM-DD");
		const addedAmount = item.mintAmount;
		if (!mintAmountGroupByDate[day]) mintAmountGroupByDate[day] = 0;
		mintAmountGroupByDate[day] += addedAmount;
	});
	const mintedVolume = Object.values(mintAmountGroupByDate);
	const minterTimestamps = Object.keys(mintAmountGroupByDate).map((item) =>
		moment(item).format("MMMM D, YYYY")
	);

	return {
		mintedVolume,
		minterTimestamps,
		minterData,
	};
}
