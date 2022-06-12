import { FunctionComponent } from "react";
import { useTokenPrice } from "src/swr-cache/useTokenPrices";
import { TimeframeType } from "src/types/charts";
import { LineChart } from "src/uikit/charts/LineChart";

type PriceComparisonChartProps = {
	timeframe: TimeframeType;
};

const PriceComparisonChart: FunctionComponent<PriceComparisonChartProps> = ({
	timeframe,
}) => {
	const { ETHRISEPrices, ETHRISETimestamps, ETHPrices, ETHTimestamps } =
		useTokenPrice(timeframe);
	return (
		<>
			<LineChart
				data={ETHRISEPrices}
				labels={ETHRISETimestamps}
				options={{ color: "gold", title: "ETHRISE's Price" }}
			/>
			<LineChart
				data={ETHPrices}
				labels={ETHTimestamps}
				options={{ color: "blue", title: "ETH's Price" }}
			/>
		</>
	);
};

export { PriceComparisonChart };
