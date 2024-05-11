import jwt from 'jsonwebtoken';
import { jwtConfig } from './config';

export interface JwtPayload {
	id: string | undefined;
    email: string;
}

export const generateToken = (payload: JwtPayload): string => {
	const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
	return token;
};

export const verifyToken = (token: string): JwtPayload => {
	const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;
	return decoded;
};
