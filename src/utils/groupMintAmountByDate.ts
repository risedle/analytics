import { MintEntities } from "../types/entities";
import { etherToDecimal } from "./etherToDecimal";
import { timestampToDateFormat } from "./timestampToDateFormat";

type GroupMintAmountByDateType = {
	mintedVolumes: number[];
	mintedTimestamps: string[];
};

const groupMintAmountByDate = (
	mintEntities: MintEntities[]
): GroupMintAmountByDateType => {
	const mintAmountGroupByDate: { [day: string]: number } = {};

	mintEntities.forEach((item) => {
		const day: string = timestampToDateFormat(item.timestamp, "YYYY-MM-DD");
		const addedAmount: number = etherToDecimal(item.amountRISE, 18);

		if (!mintAmountGroupByDate[day]) mintAmountGroupByDate[day] = 0;
		mintAmountGroupByDate[day] += addedAmount;
	});
	const mintedVolumes = Object.values(mintAmountGroupByDate).reverse();
	const mintedTimestamps = Object.keys(mintAmountGroupByDate)
		.map((item) => timestampToDateFormat(item, "MMMM D, YYYY"))
		.reverse();

	return { mintedVolumes, mintedTimestamps };
};

export { groupMintAmountByDate };
