import Logo from "../others/logo";
import Link from "next/link";

export default function Layout(props) {
	return (
		<div className="flex justify-center h-full text-white">
			<div className="w-3/4 h-full">
				<nav className="flex items-center justify-between py-4">
					<Link href="/">
						<a>
							<div className="flex items-center">
								<Logo />
								<h1 className="text-2xl p-2 ml-2">
									Risedle Analytics
								</h1>
							</div>
						</a>
					</Link>
					<div className="flex items-center flex-column">
						<Link href="/prices">
							<a className="ml-4">Prices</a>
						</Link>
						<Link href="/volume">
							<a className="ml-4">Volume</a>
						</Link>
						<Link href="/mints">
							<a className="ml-4">Mints</a>
						</Link>
						<Link href="/revenue">
							<a className="ml-4">Revenue</a>
						</Link>
					</div>
				</nav>
				<div className="mt-4 h-full">{props.children}</div>
			</div>
		</div>
	);
}
