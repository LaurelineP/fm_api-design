require('dotenv').config();

import { launchServerVanilla } from './practices/01_server_vanilla';
import { launchServerExpress } from './practices/02_server_express';
/* ----------------------------- CONFIG RELATED ----------------------------- */
const PORT = Number(process.env.PORT);

const [,, option] = process.argv;
console.log('option:', option);

const launchServer = option?.toLowerCase() === 'vanilla'
	? launchServerVanilla
	: launchServerExpress;


launchServer( PORT );