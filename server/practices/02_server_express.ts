const express = require('express');

const app = express();

function launchServerExpress( port: any ){

	app.use(express.static('static'))
	
	app.get('/', (req: any, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
		res
			.status(200)
			.send({ message: 'hello from express!'})
	})
	
	app.listen(port, () => {
		console.info(`Express listening on: http://localhost:${ port }`)
	})
}

export { launchServerExpress }