export function expressifyResp(resp) {
	return {
		...resp,
		getHeader: (header) => resp.headers[header.toLowerCase()],
		setHeader: (header, value) => (resp.headers[header.toLowerCase()] = value),
		status: () => ({ json: () => {} }),
	};
}

export function deExpressifyResp(resp) {
	const { getHeader, setHeader, ...returnAbleResp } = resp; // eslint-disable-line no-unused-vars
	return returnAbleResp;
}
