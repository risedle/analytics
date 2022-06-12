import MintChart from "src/modules/charts/mint-chart";
import Layout from "src/uikit/layouts";
import { useState } from "react";

export default function MintPage() {
	const [view, setView] = useState("volume");
	return (
		<Layout>
			<div className="flex h-full">
				<div className="w-3/4 pr-8 my-8" style={{ height: 1024 }}>
					<MintChart view={view} />
				</div>
				<div className="w-1/4">
					<h2 className="text-2xl mb-4">Switch View</h2>
					<form>
						<div className="mb-2">
							<select
								className="bg-stone-700 w-full py-2"
								value={view}
								onChange={(e) => setView(e.target.value)}
							>
								<option value="volume">Mint Volume</option>
								<option value="address">Minter Address</option>
							</select>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
