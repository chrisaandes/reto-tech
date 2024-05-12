import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import { AnyZodObject } from 'zod';
import { ServiceResponse, ResponseStatus } from '@/common/dto/service-response.dto';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const validateDTO = (schema: AnyZodObject) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const serviceResponse = new ServiceResponse(
					ResponseStatus.Failed,
					'Operation failed',
					error.errors,
					StatusCodes.BAD_REQUEST
				);
				handleServiceResponse(serviceResponse, res);
			} else {
				const serviceResponse = new ServiceResponse(
					ResponseStatus.Failed,
					'Internal server error',
					'An unexpected error occurred',
					StatusCodes.INTERNAL_SERVER_ERROR
				);
				handleServiceResponse(serviceResponse, res);
			}
		}
	};
};
