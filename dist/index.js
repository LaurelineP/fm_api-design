"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const _01_server_vanilla_1 = require("./practices/01_server_vanilla");
const _02_server_express_1 = require("./practices/02_server_express");
/* ----------------------------- CONFIG RELATED ----------------------------- */
const PORT = Number(process.env.PORT);
const [, , option] = process.argv;
console.log('option:', option);
const launchServer = (option === null || option === void 0 ? void 0 : option.toLowerCase()) === 'vanilla'
    ? _01_server_vanilla_1.launchServerVanilla
    : _02_server_express_1.launchServerExpress;
launchServer(PORT);
