import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthModule } from '@/api/health/health.module';
import { env } from '@/common/utils/envConfig';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());

//defaul route
app.all('/', (req, res) => {
	res.send('These are not the droids you are looking for.');
});

// Routes
app.use('/health', healthModule);

export { app, logger };
