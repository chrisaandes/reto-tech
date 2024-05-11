import { Pool } from 'pg';
import { env } from '@/common/utils/envConfig';
import fs from 'fs';

const { DATABASE_URL, PG_MAX_CLIENTS, PG_MIN_CLIENTS, PG_IDLE_TIMEOUT, PG_CONNECTION_TIMEOUT } = env;

const Db = new Pool({
	connectionString: DATABASE_URL,
	max: PG_MAX_CLIENTS,
	min: PG_MIN_CLIENTS,
	idleTimeoutMillis: PG_IDLE_TIMEOUT,
	connectionTimeoutMillis: PG_CONNECTION_TIMEOUT
});

Db.on('connect', () => {
	console.log('Database connected successfully');
});

Db.on('error', (err) => {
	console.error('Unexpected error on database connection', err);
	process.exit(-1);
});

const closePool = async () => {
	await Db.end();
	console.log('Database connection closed');
};

export { Db, closePool };
