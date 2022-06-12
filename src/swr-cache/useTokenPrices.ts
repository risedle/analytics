import moment from "moment";
import {
	TimeframeType,
	RiseSnapshotType,
	CoinGeckoMarketChartType,
} from "../types/charts";
import useSWR from "swr";
import { timestampToDateFormat } from "src/utils/timestampToDateFormat";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useTokenPrice(timeframe: TimeframeType) {
	/**
	 * @dev Fetching the ETHRISE data from risedle snapshot
	 */
	const { data: ETHRISEData, error: ETHRISEError } = useSWR<
		RiseSnapshotType[]
	>(
		`https://snapshot-arbitrum.risedle.com/v1/leveragedTokens/${timeframe}/0x46D06cf8052eA6FdbF71736AF33eD23686eA1452`,
		fetcher
	);
	let ETHRISEPrices: number[] = [];
	let ETHRISETimestamps: string[] = [];
	if (ETHRISEData) {
		ETHRISEPrices = ETHRISEData.map((item) => item.nav);
		ETHRISETimestamps = ETHRISEData.map((item) =>
			timestampToDateFormat(item.timestamp, "MMM D, YYYY hh:mm:s a")
		);
	}

	/**
	 * @dev Fetching the ETH data from coingecko
	 */
	const { data: ETHData, error: ETHError } = useSWR<CoinGeckoMarketChartType>(
		`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=90`,
		fetcher
	);
	let ETHDataFilteredTimestamp: [number, number][];
	let ETHPrices: number[] = [];
	let ETHTimestamps: string[] = [];
	if (ETHData) {
		ETHDataFilteredTimestamp = ETHData.prices;
		if (timeframe !== "3months") {
			ETHDataFilteredTimestamp = ETHDataFilteredTimestamp.slice(
				ETHData.prices.length - ETHRISEPrices.length + 1,
				ETHData.prices.length
			);
		}
		ETHPrices = ETHDataFilteredTimestamp.map((item) => item[1]);
		ETHTimestamps = ETHDataFilteredTimestamp.map((item) =>
			timestampToDateFormat(item[0], "MMM D, YYYY hh:mm:s a")
		);
	}

	const error = ETHError || ETHRISEError;
	return {
		ETHRISEPrices,
		ETHRISETimestamps,
		ETHPrices,
		ETHTimestamps,
		error,
	};
}

export { useTokenPrice };
