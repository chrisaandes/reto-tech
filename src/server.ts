import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';
import { env } from '@/common/utils/envConfig';
import { unexpectedRequest, addErrorToRequestLog, globalErrorHandler } from '@/api/shared/middlewares/errorHandler';
import rateLimiter from '@/api/shared/middlewares/rateLimit';
import requestLogger from '@/api/shared/middlewares/requestLogger';
import authMiddleware from '@/api/shared/middlewares/auth';

import { healthModule } from '@/api/core/health/health.module';
import { eventModule } from '@/api/core/event/event.module';
import { userModule } from './api/core/user/user.module';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

//defaul route
app.all('/', (req, res) => {
	res.send('These are not the droids you are looking for.');
});

app.use(authMiddleware([{ path: '/events', method: 'GET' },{ path: '/users', method: 'POST' },{ path: '/login', method: 'POST' }]))

// Routes
app.use('/health', healthModule);
app.use(eventModule);
app.use(userModule);

app.use( eventModule);
app.use(userModule);

// Error handlers
app.use(unexpectedRequest);
app.use(addErrorToRequestLog);
app.use(globalErrorHandler);

export { app, logger };
