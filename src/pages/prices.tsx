import PriceChart from "src/modules/charts/price-chart";
import Layout from "src/uikit/layouts";
import { useState } from "react";
import { NextPage } from "next";

export default function PricePage() {
	const [timeframe, setTimeframe] = useState("daily");
	return (
		<Layout>
			<div className="flex h-full">
				<div className="w-3/4 pr-8 my-8" style={{ height: 1024 }}>
					<PriceChart timeframe={timeframe} />
				</div>
				<div className="w-1/4">
					<h2 className="text-2xl mb-4">Filter</h2>
					<form>
						<div className="mb-2">
							<select
								className="bg-stone-700 w-full py-2"
								value={timeframe}
								onChange={(e) => setTimeframe(e.target.value)}
							>
								<option value="daily">1 Day</option>
								<option value="weekly">1 Week</option>
								<option value="monthly">1 Month</option>
								<option value="3months">3 Months</option>
							</select>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
