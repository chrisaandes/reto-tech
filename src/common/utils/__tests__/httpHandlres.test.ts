import { handleServiceResponse, validateRequest } from '../httpHandlers';
import { ResponseStatus, ServiceResponse } from '../../../common/dto/service-response.dto';
import { StatusCodes } from 'http-status-codes';
import { z, ZodError } from 'zod';

describe('handleServiceResponse', () => {
  it('should set the correct status code and send the service response', () => {
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'All good', { key: 'value' }, StatusCodes.OK);

    handleServiceResponse(serviceResponse, mockResponse as any);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(mockResponse.send).toHaveBeenCalledWith(serviceResponse);
  });
});

describe('validateRequest', () => {
  const schema = z.object({
    body: z.object({
      name: z.string(),
    })
  });
  const middleware = validateRequest(schema);

  it('should call next if validation is successful', () => {
    const req = {
      body: { name: 'John' }
    };
    const res = {};
    const next = jest.fn();

    middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
  });

  it('should return an error response if validation fails', () => {
    const req = {
      body: { name: 123 } // incorrect type to induce error
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    const next = jest.fn();

    middleware(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.send).toBeCalledWith(expect.anything());
  });
});
