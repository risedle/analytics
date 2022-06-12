import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FunctionComponent } from "react";
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);
const chartOption: ChartOptions<"line"> = {
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
type LineChartProps = {
	labels: string[];
	data: number[];
	options: {
		title: string;
		color: string;
	};
};

const LineChart: FunctionComponent<LineChartProps> = ({
	labels,
	data,
	options,
}) => {
	return (
		<Line
			options={chartOption}
			data={{
				labels: labels,
				datasets: [
					{
						label: options.title,
						data: data,
						backgroundColor: [options.color],
						borderColor: [options.color],
						borderWidth: 2,
					},
				],
			}}
		/>
	);
};

export { LineChart };
