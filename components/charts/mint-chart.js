import useSWR from "swr";
import axios from "axios";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import moment from "moment";
import { useEffect } from "react";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
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
		minterError,
		minterData,
	};
}

function shortenHash(hash) {
	const show = 5;
	return (
		hash.slice(0, show) +
		"..." +
		hash.slice(hash.length - show + 1, hash.length)
	);
}

export default function MintChart({ view }) {
	const { mintedVolume, minterTimestamps, minterData, minterError } =
		useMintVolume();
	return view === "volume" ? (
		<Bar
			options={chartOption}
			data={{
				labels: minterTimestamps,
				datasets: [
					{
						label: "Minted Volume",
						data: mintedVolume,
						backgroundColor: ["teal"],
						borderColor: ["teal"],
						borderWidth: 2,
					},
				],
			}}
		/>
	) : (
		<table className="w-full border-collapse border border-slate-500">
			<tr>
				<th className="border border-slate-600">txHash</th>
				<th className="border border-slate-600">minter</th>
				<th className="border border-slate-600">wen?</th>
				<th className="border border-slate-600">amount</th>
			</tr>
			{minterData
				?.map((item, idx) => minterData[minterData.length - 1 - idx])
				?.map((item) => (
					<tr key={item.transactionHash}>
						<td className="border border-slate-700">
							{shortenHash(item.transactionHash)}
						</td>
						<td className="border border-slate-700">
							{shortenHash(item.minter)}
						</td>
						<td className="border border-slate-700">
							{moment
								.unix(item.timestamp)
								.format("MMM D, YYYY hh:mm:s a")}
						</td>
						<td className="border border-slate-700">
							{item.mintAmount.toFixed(4)} ETHRISE
						</td>
					</tr>
				))}
		</table>
	);
}
