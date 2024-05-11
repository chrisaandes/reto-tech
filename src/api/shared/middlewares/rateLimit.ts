import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';

import { env } from '@/common/utils/envConfig';

const rateLimiter = rateLimit({
	legacyHeaders: true,
	limit: env.RATE_LIMIT_MAX_REQUESTS,
	message: 'Too many requests, please try again later.',
	standardHeaders: true,
	windowMs: 15 * 60 * env.RATE_LIMIT_WINDOW_MS,
	keyGenerator: (req: Request) => req.ip as string
});

export default rateLimiter;
