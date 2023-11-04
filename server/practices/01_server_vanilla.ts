const http = require('node:http');
function launchServerVanilla( PORT: number ) {
	/** Endpoints collection -  Add endpoint to the collection **/ 
	const endpointsDetails = {
		home_get: [ '/', 'GET' ],
		login_get: [ '/login', 'GET' ],
	}

	const sendResponseJSON = (statusCode: number, responseValue: { message: string; request: string; }, res: { writeHead: (arg0: number, arg1: { "Content-Type": string; }) => void; write: (arg0: string) => void; end: () => void; }) => {
		const headers 		= { "Content-Type": "application/json" };
		const JSONresponse 	= JSON.stringify(responseValue);

		res.writeHead(statusCode, headers);
		res.write(JSONresponse);
		res.end();
		return;
	}

	const isSupportedRequest = ( reqURL: string, reqMethod: string ) => {
		return !!Object.values(endpointsDetails)
			.find(URLMethodTuple => (
				URLMethodTuple.includes(reqURL)
				&& URLMethodTuple.includes(reqMethod)
			)
		)
	}

	const server = http.createServer(( req: { url: any; method: any; }, res: { writeHead: (arg0: number, arg1: { "Content-Type": string; }) => void; write: (arg0: string) => void; end: () => void; }) => {
		const { url, method } = req;
		const isAuthorized = isSupportedRequest(url, method);
	
		isAuthorized
			? sendResponseJSON(200, { message: `Hello Home!`, request: `${method} ${url}`}, res)
			: sendResponseJSON(404, { message: `Unknown!`,  request: `${method} ${url}`}, res);
	})

	server.listen(PORT, () => {
		console.info(`Server's listening on http://localhost:${PORT} `)
	})
}

// module.exports = {
// 	launchServerVanilla: launchServerVanilla
// }

export { launchServerVanilla }