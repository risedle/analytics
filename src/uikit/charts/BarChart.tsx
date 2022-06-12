import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { FunctionComponent } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
const chartOption: any = {
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
			custom: function (tooltipModel: any) {
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

type BarChartProps = {
	labels: string[];
	data: number[];
	options: {
		title: string;
		color: string;
	};
};

const BarChart: FunctionComponent<BarChartProps> = ({
	labels,
	data,
	options,
}) => {
	return (
		<Bar
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

export { BarChart };
