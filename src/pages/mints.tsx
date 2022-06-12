import Layout from "src/uikit/layouts";
import { useState } from "react";
import { useMint } from "src/swr-cache/useMint";
import { MinterTable } from "src/modules/mints/MinterTable";
import { MintVolumeChart } from "src/modules/mints/MintVolumeChart";

export default function MintPage() {
	const { loading, data } = useMint();
	const [view, setView] = useState("volume");
	return (
		<Layout>
			<div className="flex h-full flex-col">
				{loading ? (
					"Loading..."
				) : (
					<>
						<div className="w-full my-8" style={{ height: 1024 }}>
							<MintVolumeChart mintEntities={data} />
						</div>
						<div className="w-full my-8" style={{ height: 1024 }}>
							<MinterTable mintEntities={data} />
						</div>
					</>
				)}
			</div>
		</Layout>
	);
}
