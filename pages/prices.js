import PriceChart from "../components/charts/price-chart";
import Layout from "../components/layouts";

export default function Price() {
	return (
		<Layout>
			<div className="flex">
				<div className="w-3/4">
					<PriceChart />
				</div>
				<div className="w-1/4">
					<h2 className="text-2xl mb-4">Filter</h2>
					<form>
						<div className="mb-2">
							<select className="bg-stone-700 w-full py-2">
								<option>1 Day</option>
								<option>1 Week</option>
								<option>2 Weeks</option>
								<option>1 Month</option>
								<option>3 Months</option>
							</select>
						</div>
						<div>
							<input type="checkbox" /> ETH
						</div>
						<div>
							<input type="checkbox" /> ETHRISE
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
