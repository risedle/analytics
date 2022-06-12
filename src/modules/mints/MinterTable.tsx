import moment from "moment";
import Link from "next/link";
import { FunctionComponent } from "react";
import { MintEntities } from "../../types/entities";
import { shortenHash } from "../../utils/sortenHash";

type MinterTableProps = {
	mintEntities: MintEntities[];
};

const MinterTable: FunctionComponent<MinterTableProps> = ({ mintEntities }) => {
	return (
		<table className="w-full border-collapse border border-slate-500">
			<tr>
				<th className="border border-slate-600">txHash</th>
				<th className="border border-slate-600">minter</th>
				<th className="border border-slate-600">timestamp</th>
				<th className="border border-slate-600">amount</th>
			</tr>
			{mintEntities.map((item) => (
				<tr key={item.id}>
					<td className="border border-slate-700">
						<Link href={"https://arbiscan.io/tx/" + item.id}>
							<a target={"_blank"}>{shortenHash(item.id)}</a>
						</Link>
					</td>
					<td className="border border-slate-700">
						<Link href={"https://arbiscan.io/address/" + item.user}>
							<a target={"_blank"}>{shortenHash(item.user)}</a>
						</Link>
					</td>
					<td className="border border-slate-700">
						{moment
							.unix(parseInt(item.timestamp))
							.format("MMM D, YYYY hh:mm:s a")}
					</td>
					<td className="border border-slate-700">
						{(parseFloat(item.amountRISE) / 10 ** 18).toFixed(4)}{" "}
						ETHRISE
					</td>
				</tr>
			))}
		</table>
	);
};

export { MinterTable };
