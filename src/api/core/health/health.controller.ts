import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { ServiceResponse, ResponseStatus } from '@/common/dto/service-response.dto';

export const health = async (_req: Request, res: Response) => {
	const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);
	handleServiceResponse(serviceResponse, res);
};
