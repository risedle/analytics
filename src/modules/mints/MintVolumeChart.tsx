import moment from "moment";
import { FunctionComponent } from "react";
import { MintEntities } from "../../types/entities";
import { BarChart } from "../../uikit/charts/BarChart";

type MintVolumeChartProps = {
	mintEntities: MintEntities[];
};

const MintVolumeChart: FunctionComponent<MintVolumeChartProps> = ({
	mintEntities,
}) => {
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
