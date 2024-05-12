import express, { Router } from 'express';
import { HealthController } from './health.controller';

export const healthModule: Router = (() => {
	const router = express.Router();

	router.get('/', HealthController.health);

	return router;
})();
