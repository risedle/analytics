import moment from "moment";
import { TimeframeType, RiseSnapshotType, CoinGeckoMarketChartType } from "src/types/charts";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function useTokenPrice(timeframe: TimeframeType) {
	const { data: ETHRISEData, error: ETHRISEError } = useSWR<
		RiseSnapshotType[]
	>(
		`https://snapshot-arbitrum.risedle.com/v1/leveragedTokens/${timeframe}/0x46D06cf8052eA6FdbF71736AF33eD23686eA1452`,
		fetcher
	);
	const ETHRISEPrices = ETHRISEData
		? ETHRISEData.map((item) => item.nav)
		: [];
	const ETHRISETimestamps = ETHRISEData
		? ETHRISEData.map((item) =>
				moment(item.timestamp).format("MMMM D, YYYY h:mm a")
		  )
		: [];

	const { data: ETHData, error: ETHError } = useSWR<CoinGeckoMarketChartType>(
		`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=90`,
		fetcher
	);
	const ETHDataFilteredTimestamp = ETHData
		? timeframe !== "3months"
			? ETHData.prices.slice(
					ETHData.prices.length - ETHRISEPrices.length + 1,
					ETHData.prices.length
			  )
			: ETHData.prices
		: [];
	const ETHPrices = ETHDataFilteredTimestamp.map((item) => item[1]);
	const ETHTimestamps = ETHDataFilteredTimestamp.map((item) =>
		moment(item[0]).format("MMMM D, YYYY h:mm a")
	);

	const error = ETHError && ETHRISEError;
	return {
		ETHRISEPrices,
		ETHRISETimestamps,
		ETHPrices,
		ETHTimestamps,
		error,
	};
}

export { useTokenPrice };
