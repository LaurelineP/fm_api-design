"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchServerExpress = void 0;
const express = require('express');
const app = express();
function launchServerExpress(port) {
    app.use(express.static('static'));
    app.get('/', (req, res) => {
        res
            .status(200)
            .send({ message: 'hello from express!' });
    });
    app.listen(port, () => {
        console.info(`Express listening on: http://localhost:${port}`);
    });
}
exports.launchServerExpress = launchServerExpress;
