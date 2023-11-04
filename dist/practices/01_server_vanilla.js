"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServerVanilla = void 0;
const http = require('node:http');
function launchServerVanilla(PORT) {
    /** Endpoints collection -  Add endpoint to the collection **/
    const endpointsDetails = {
        home_get: ['/', 'GET'],
        login_get: ['/login', 'GET'],
    };
    const sendResponseJSON = (statusCode, responseValue, res) => {
        const headers = { "Content-Type": "application/json" };
        const JSONresponse = JSON.stringify(responseValue);
        res.writeHead(statusCode, headers);
        res.write(JSONresponse);
        res.end();
        return;
    };
    const isSupportedRequest = (reqURL, reqMethod) => {
        return !!Object.values(endpointsDetails)
            .find(URLMethodTuple => (URLMethodTuple.includes(reqURL)
            && URLMethodTuple.includes(reqMethod)));
    };
    const server = http.createServer((req, res) => {
        const { url, method } = req;
        const isAuthorized = isSupportedRequest(url, method);
        isAuthorized
            ? sendResponseJSON(200, { message: `Hello Home!`, request: `${method} ${url}` }, res)
            : sendResponseJSON(404, { message: `Unknown!`, request: `${method} ${url}` }, res);
    });
    server.listen(PORT, () => {
        console.info(`Server's listening on http://localhost:${PORT} `);
    });
}
exports.launchServerVanilla = launchServerVanilla;
