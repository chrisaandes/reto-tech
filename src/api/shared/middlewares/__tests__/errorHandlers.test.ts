import { Request, Response } from 'express';
import { unexpectedRequest, addErrorToRequestLog } from '../errorHandler';
import { StatusCodes } from 'http-status-codes';

describe('Middleware', () => {
  describe('unexpectedRequest', () => {
    it('should send a 404 status code', () => {
      const req = {} as Request;
      const res = {
        sendStatus: jest.fn(),
      } as unknown as Response;

      unexpectedRequest(req, res, () => {});

      expect(res.sendStatus).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    });
  });

  describe('addErrorToRequestLog', () => {
    it('should add the error to res.locals and call next with the error', () => {
      const req = {} as Request;
      const res = {
        locals: {},
      } as unknown as Response;
      const next = jest.fn();
      const error = new Error('Test error');

      addErrorToRequestLog(error, req, res, next);

      expect(res.locals.err).toBe(error);
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});