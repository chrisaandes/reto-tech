import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ServiceResponse, ResponseStatus } from '@/common/dto/service-response.dto';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export abstract class BaseController {
	protected sendResponse(req: Request, res: Response, promise: Promise<any>): void {
		promise
			.then((data) => {
				const status = data ? StatusCodes.OK : StatusCodes.NOT_FOUND;
				const message = data ? 'Operation successful' : 'Data not found';
				const responseStatus = data ? ResponseStatus.Success : ResponseStatus.Failed;
				const serviceResponse = new ServiceResponse(responseStatus, message, data, status);
				handleServiceResponse(serviceResponse, res);
			})
			.catch((error) => {
				const serviceResponse = new ServiceResponse(
					ResponseStatus.Failed,
					'Operation failed',
					error.message,
					StatusCodes.BAD_REQUEST
				);
				handleServiceResponse(serviceResponse, res);
			});
	}
}
