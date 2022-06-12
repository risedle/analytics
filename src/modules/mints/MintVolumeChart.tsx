import moment from "moment";
import { FunctionComponent } from "react";
import { MintEntities } from "src/types/entities";
import { BarChart } from "src/uikit/charts/BarChart";

type MintVolumeChartProps = {
	mintEntities: MintEntities[];
};

const MintVolumeChart: FunctionComponent<MintVolumeChartProps> = ({
	mintEntities,
}) => {
	const labels = mintEntities.map((item) =>
		moment.unix(parseInt(item.timestamp)).format("MMM D, YYYY hh:mm:s a")
	);
	const data = mintEntities.map(
		(item) => parseFloat(item.amountRISE) / 10 ** 18
	);

	const mintAmountGroupByDate: { [day: string]: number } = {};
	mintEntities.forEach((item) => {
		const day: string = moment
			.unix(parseInt(item.timestamp))
			.format("YYYY-MM-DD");
		const addedAmount: number = parseFloat(item.amountRISE) / 10 ** 18;
		if (!mintAmountGroupByDate[day]) mintAmountGroupByDate[day] = 0;
		mintAmountGroupByDate[day] += addedAmount;
	});
	const mintedVolume = Object.values(mintAmountGroupByDate).reverse();
	const minterTimestamps = Object.keys(mintAmountGroupByDate)
		.map((item) => moment(item).format("MMMM D, YYYY"))
		.reverse();

	return (
		<BarChart
			data={mintedVolume}
			labels={minterTimestamps}
			options={{ color: "crimson", title: "Mint Volume Chart" }}
		/>
	);
};

export { MintVolumeChart };
