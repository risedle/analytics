import { FunctionComponent } from "react";
import { groupMintAmountByDate } from "src/utils/groupMintAmountByDate";
import { MintEntities } from "../../types/entities";
import { BarChart } from "../../uikit/charts/BarChart";

type MintVolumeChartProps = {
	mintEntities: MintEntities[];
};

const MintVolumeChart: FunctionComponent<MintVolumeChartProps> = ({
	mintEntities,
}) => {

	const { mintedVolumes, mintedTimestamps } =
		groupMintAmountByDate(mintEntities);

	return (
		<BarChart
			data={mintedVolumes}
			labels={mintedTimestamps}
			options={{ color: "crimson", title: "Mint Volume Chart" }}
		/>
	);
};

export { MintVolumeChart };
