import express, { Router } from 'express';
import { health } from './health.controller';

export const healthModule: Router = (() => {
	const router = express.Router();

	router.get('/', health);

	return router;
})();
