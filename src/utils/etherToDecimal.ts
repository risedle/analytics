const etherToDecimal = (amount: string, decimals: number): number =>
	parseFloat(amount) / 10 ** decimals;

export { etherToDecimal };
