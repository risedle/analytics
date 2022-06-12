import { MinterTable } from "src/modules/mints/MinterTable";
import { MintVolumeChart } from "src/modules/mints/MintVolumeChart";
import { useMint } from "src/swr-cache/useMint";
import Layout from "src/uikit/layouts";

export default function MintPage() {
	const { loading, data } = useMint();
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
