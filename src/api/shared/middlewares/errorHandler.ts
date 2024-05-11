import { ErrorRequestHandler, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const unexpectedRequest: RequestHandler = (_req, res) => {
	res.sendStatus(StatusCodes.NOT_FOUND);
};

export const addErrorToRequestLog: ErrorRequestHandler = (err, _req, res, next) => {
	res.locals.err = err;
	next(err);
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	const statusCode = res.statusCode !== StatusCodes.OK ? res.statusCode : StatusCodes.INTERNAL_SERVER_ERROR;
	res.status(statusCode);

	res.json({
		status: statusCode,
		message: err.message || 'Server error',
		stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
	});
};


export const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	res.locals.err = err.stack;

	if (res.headersSent) {
		return _next(err);
	}

	res.status(StatusCodes.INTERNAL_SERVER_ERROR);

	res.json({
		status: StatusCodes.INTERNAL_SERVER_ERROR,
		message: 'Error interno del servidor',
		stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
	});
};
