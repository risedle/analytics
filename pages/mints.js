import MintChart from "../components/charts/mint-chart";
import Layout from "../components/layouts";

export default function Mints() {
	return (
		<Layout>
			<div className="flex h-full">
				<div className="w-3/4 pr-8 my-8" style={{ height: 1024 }}>
					<MintChart />
				</div>
				{/* <div className="w-1/4">
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
						<div>
							<input type="checkbox" /> ETH
						</div>
						<div>
							<input type="checkbox" /> ETHRISE
						</div>
					</form>
				</div> */}
			</div>
		</Layout>
	);
}
