import { responseBodyMiddleware, customLogLevel, customSuccessMessage, genReqId } from '../requestLogger';
import httpMocks from 'node-mocks-http';
import { StatusCodes } from 'http-status-codes';
import pino from 'pino';

describe('responseBodyMiddleware', () => {
	it('should capture responseBody in non-production environments', () => {
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const next = jest.fn();
		process.env.NODE_ENV = 'development';

		responseBodyMiddleware(req, res, next);
		res.send('Hello, world!');

		expect(res.locals.responseBody).toBe('Hello, world!');
		expect(next).toHaveBeenCalled();
	});
});

describe('customLogLevel', () => {
	const logger = pino();

	it('should return Error level for server errors', () => {
		const req = httpMocks.createRequest({
			id: 'test-id',
			log: logger,
			allLogs: [logger]
		});
		const res = httpMocks.createResponse();
		res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
		const level = customLogLevel(req, res);
		expect(level).toBe('error');
	});

	it('should return Warn level for client errors', () => {
		const req = httpMocks.createRequest({
			id: 'test-id',
			log: logger,
			allLogs: [logger]
		});
		const res = httpMocks.createResponse();
		res.statusCode = StatusCodes.BAD_REQUEST;
		const level = customLogLevel(req, res);
		expect(level).toBe('warn');
	});

	it('should return Info level for other responses', () => {
		const req = httpMocks.createRequest({
			id: 'test-id',
			log: logger,
			allLogs: [logger]
		});
		const res = httpMocks.createResponse();
		res.statusCode = StatusCodes.OK;
		const level = customLogLevel(req, res);
		expect(level).toBe('info');
	});
});

describe('customSuccessMessage', () => {
	it('should return specific message for 404 status', () => {
		const req = httpMocks.createRequest({
			method: 'GET'
		});
		const res = httpMocks.createResponse();
		res.statusCode = StatusCodes.NOT_FOUND;
		const message = customSuccessMessage(req, res);
		expect(message).toBe('Not Found');
	});

	it('should return generic completed message for other statuses', () => {
		const req = httpMocks.createRequest({
			method: 'POST'
		});
		const res = httpMocks.createResponse();
		res.statusCode = StatusCodes.CREATED;
		const message = customSuccessMessage(req, res);
		expect(message).toBe('POST completed');
	});
});

describe('genReqId', () => {
	it('should generate a new UUID if none is provided', () => {
		const req = httpMocks.createRequest();
		const res = httpMocks.createResponse();
		const id = genReqId(req, res);
		expect(id).toBeDefined();
		expect(res.getHeader('X-Request-Id')).toBe(id);
	});

	it('should use existing request id if provided', () => {
		const req = httpMocks.createRequest({
			headers: { 'x-request-id': '12345' }
		});
		const res = httpMocks.createResponse();
		const id = genReqId(req, res);
		expect(id).toBe('12345');
	});
});
