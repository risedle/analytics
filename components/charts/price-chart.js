import useSWR from "swr";
import axios from "axios";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import { useEffect } from "react";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const chartOption = {
	color: "white",
	borderColor: "white",
	elements: {
		point: {
			radius: 0,
		},
	},
	plugins: {
		tooltip: {
			enabled: true,
			intersect: false,
			custom: function (tooltipModel) {
				tooltipModel.opacity = 0;
			},
		},
		legend: {
			display: true,
			position: "bottom",
			labels: {
				// This more specific font property overrides the global property
				font: {
					size: 14,
				},
			},
		},
	},
	scales: {
		x: {
			display: false,
		},
	},
};

const fetcher = (...args) => axios(...args).then((res) => res.data);

function useTokenPrice(timeframe) {
	const { data: ETHRISEData, ETHRISEError } = useSWR(
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

	const { data: ETHData, ETHError } = useSWR(
		`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=90`,
		fetcher
	);
	const ETHPrices = ETHData ? ETHData.prices.map((item) => item[1]) : [];
	const ETHTimestamps = ETHData
		? ETHData.prices.map((item) =>
				moment(item[0]).format("MMMM D, YYYY h:mm a")
		  )
		: [];

	const error = ETHError && ETHRISEError;
	return {
		ETHRISEPrices,
		ETHRISETimestamps,
		ETHPrices,
		ETHTimestamps,
		error,
	};
}

export default function PriceChart({ timeframe }) {
	const { ETHRISEPrices, ETHRISETimestamps, ETHPrices, ETHTimestamps } =
		useTokenPrice(timeframe);
	return (
		<>
			<Line
				options={chartOption}
				data={{
					labels: ETHTimestamps,
					datasets: [
						{
							label: "ETH's Price",
							data: ETHPrices,
							backgroundColor: ["cyan"],
							borderColor: ["cyan"],
							borderWidth: 2,
						},
						// {
						// 	label: "ETHRISE's Price",
						// 	data: ETHRISEPrices,
						// 	backgroundColor: ["teal"],
						// 	borderColor: ["teal"],
						// 	borderWidth: 2,
						// },
					],
				}}
			/>
			<Line
				options={chartOption}
				data={{
					labels: ETHRISETimestamps,
					datasets: [
						{
							label: "ETHRISE's Price",
							data: ETHRISEPrices,
							backgroundColor: ["teal"],
							borderColor: ["teal"],
							borderWidth: 2,
						},
					],
				}}
			/>
		</>
	);
}
