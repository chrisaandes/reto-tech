import { Request } from 'express';
import { rateLimit } from 'express-rate-limit';
import { env } from '../../../../common/utils/envConfig';
import rateLimiter from '../rateLimit';

jest.mock('express-rate-limit');

describe('rateLimiter', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call rateLimit with the correct options', () => {
		rateLimiter;

		expect(rateLimit).toHaveBeenCalledWith({
			legacyHeaders: true,
			limit: env.RATE_LIMIT_MAX_REQUESTS,
			message: 'Too many requests, please try again later.',
			standardHeaders: true,
			windowMs: 15 * 60 * env.RATE_LIMIT_WINDOW_MS,
			keyGenerator: expect.any(Function)
		});
	});
});
