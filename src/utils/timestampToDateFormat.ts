import moment from "moment";

const timestampToDateFormat = (
	timestamp: string | number,
	format: string
): string => {
	if (
		typeof timestamp === "string" &&
		parseInt(timestamp).toString() !== timestamp
	) {
		return moment(timestamp).format(format);
	} else if (typeof timestamp === "string") {
		return moment.unix(parseInt(timestamp)).format(format);
	} else {
		return moment.unix(timestamp).format(format);
	}
};

export { timestampToDateFormat };
