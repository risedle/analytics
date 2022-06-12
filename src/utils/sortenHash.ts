function shortenHash(hash: string) {
	const show = 5;
	return (
		hash.slice(0, show) +
		"..." +
		hash.slice(hash.length - show + 1, hash.length)
	);
}

export { shortenHash };
