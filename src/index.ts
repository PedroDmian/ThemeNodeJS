import * as R from 'ramda';
import cluster from 'cluster';
import { Express } from 'express';

// ? Config
import { NODE_ENV } from './config';

// ? Server
import { createExpressApp, createServer, assignRoutes } from './server';
import { createServerGraphql } from './graphql';

// ? Utils
import { configureListeners } from './utils/process-listeners';
import { createSocketServer, getSocketInstance } from './socketio';
import { serverUp, numCPUs } from './server/utils';
import { validateEnvConfigMongo } from './config/utils';

import { cronService } from './cron';
import { db } from './database';
import { Configs } from './entity';

const boot = async () => {
  console.info('Starting Process 🚀');

	try {
		configureListeners();
		validateEnvConfigMongo();
		
		// ? Start Servers
		let expressApp: Express = await createExpressApp();
		expressApp = await createServerGraphql(expressApp);
		const server = createServer(expressApp);

		// ? ServeApp
    expressApp = assignRoutes(getSocketInstance)

		// ? Start SoketIO
		const socketIO = createSocketServer(server);

		// ? Run Server
		await serverUp(server);

		// ? DataBase Run
		const dbConnect = await db.connect();

		cronService();

		console.info('Starting process completed 👍')
	}  catch(err: any) {
		console.error(err?.message, err?.stack, '😓')
		process.exit(1)
	}
};

if(cluster.isPrimary && !R.includes(NODE_ENV, ["", "LOCAL", "development"])) {
	console.info(`MASTER ${process.pid} is running`);
	for(let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}
	cluster.on("exit", (worker) => {
		console.info(`worker ${worker.process.pid} died`);
	});
} else {
	boot();
}