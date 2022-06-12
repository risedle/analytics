import Layout from "src/uikit/layouts";

export default function HomePage() {
	return (
		<Layout>
			<p>gm!</p>

			<div className="mt-8">
				Please create dune dashboard similar to
				<a
					href="https://dune.com/jdcook/ETH2x-FLI"
					target="_blank"
					rel="noreferrer"
				>
					{" "}
					https://dune.com/jdcook/ETH2x-FLI
				</a>
			</div>
			<div>What has to be inside </div>
			<div>✦ volume - accumulative and daily</div>
			<div>✦ mint x - accumulative and daily</div>
			<div>✦ address mint - accumulative and daily</div>
			<div>✦ revenue - accumulative and daily</div>
			<div>✦ to be added later</div>
			{/* <pre>{!loading ? JSON.stringify(data) : "loading"}</pre> */}
		</Layout>
	);
}
