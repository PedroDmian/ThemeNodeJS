import { createConnection } from 'typeorm';
import { connection, connectionMongo } from './settings';
import * as Entities from '../entity';
import { DB_ACTIVE, M_DB_ACTIVE } from '../config';

import { Configs } from '../entity';

export function AppDataSource() {

}

export const db = {
    connect: async () => {
			try {
				if(M_DB_ACTIVE) {
					await createConnection({
						...connectionMongo,
						...{
							useNewUrlParser: true,
							useUnifiedTopology: true,
							useCreateIndex: true,
							useFindAndModify: false,
							keepAlive: (15000 * 3),
							keepAliveInitialDelay: (15000 * 3),
							connectTimeoutMS: (15000 * 3),
							socketTimeoutMS: (10000 * 3),
						},
						entities: Object.values(Entities)
					});

					console.log('Run MongoDB 🐒');	
				}

				if(DB_ACTIVE) {
					await createConnection({
						...connection,
						entities: Object.values(Entities),
						cli: {
							migrationsDir: '../database/migrations'
						}
					});

					console.log(`Run ${connection.type}`);
				}
			} catch(error) {
				throw error;
			}
    }
};