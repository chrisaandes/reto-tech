import dotenv from 'dotenv';
import { cleanEnv, num, host, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
	NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
	HOST: host({ devDefault: testOnly('localhost') }),
	PORT: port({ devDefault: testOnly(3000) }),
	CORS_ORIGIN: str({ devDefault: testOnly('http://localhost:3000') }),
	RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
	RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
	DATABASE_URL: str({ devDefault: testOnly('localhost') }),
	PG_MAX_CLIENTS: num({ devDefault: testOnly(20) }),
	PG_MIN_CLIENTS: num({ devDefault: testOnly(4) }),
	PG_IDLE_TIMEOUT: num({ devDefault: testOnly(10000) }),
	PG_CONNECTION_TIMEOUT: num({ devDefault: testOnly(2000) }),
	JWT_SECRET: str({ devDefault: testOnly('secret') }),
});
