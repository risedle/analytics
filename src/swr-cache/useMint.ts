// import moment from "moment";
// import { useState, useEffect } from "react";
import { request } from "graphql-request";
import useSWR from "swr";

const fetcher = (query: string, variables: any) =>
	request(
		"https://api.thegraph.com/subgraphs/name/dimasriat/risedle-dashboard",
		query,
		variables
	).then((data) => data.mintEntities);

const useMint = () => {
	const { data, error } = useSWR(
		`{
			mintEntities(orderBy: timestamp, orderDirection: desc) {
			  id
			  user
			  riseToken
			  amountETH
			  amountRISE
			  timestamp
			}
		}`,
		fetcher
	);
	const loading = !data && !error;
	return { data, loading, error };
};

export { useMint };
