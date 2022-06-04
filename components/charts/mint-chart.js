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

function useMintVolume() {
	const { data: minterData, error: minterError } = useSWR(
		`/api/minter`,
		fetcher
	);
	const minterAmounts = minterData
		? minterData.map((item) => item.mintAmount)
		: [];
	const minterTimestamps = minterData
		? minterData.map((item) =>
				moment.unix(item.timestamp).format("MMMM D, YYYY h:mm a")
		  )
		: [];

	return {
		minterAmounts,
		minterTimestamps,
		minterError,
	};
}

export default function MintChart({ timeframe }) {
	const { minterAmounts, minterTimestamps, minterError } = useMintVolume();
	return (
		<Line
			options={chartOption}
			data={{
				labels: minterTimestamps,
				datasets: [
					{
						label: "Minter Amounts",
						data: minterAmounts,
						backgroundColor: ["purple"],
						borderColor: ["purple"],
						borderWidth: 2,
					},
				],
			}}
		/>
	);
}
