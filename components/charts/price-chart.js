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
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const fetcher = (...args) => axios(...args).then((res) => res.data);

export default function PriceChart({ timeframe }) {
	const { data: ETHRISEData, error } = useSWR(
		`https://snapshot-arbitrum.risedle.com/v1/leveragedTokens/${timeframe}/0x46D06cf8052eA6FdbF71736AF33eD23686eA1452`,
		fetcher
	);
	const ETHRISEPrices = ETHRISEData ? ETHRISEData.map((item) => item.nav) : []; //.filter((item, i) => i <= 10);
	const ETHRISETimestamps = ETHRISEData
		? ETHRISEData.map((item) =>
				moment(item.timestamp).format("MMMM D, YYYY h:mm a")
		  )
		: []; //.filter((item, i) => i <= 10);
		
	return (
		<Line
			options={{
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
			}}
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
	);
}
