import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../types/AuthenticatedRequest';

interface TokenPayload {
  userId: string;
}

interface ExcludedRoute {
  path: string;
  method: string;
}

const authMiddleware = (excludedRoutes: ExcludedRoute[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (excludedRoutes.some(route => req.path === route.path && req.method === route.method)) {
      return next();
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No authentication token provided' });
    }

    try {
      const secretKey = process.env.JWT_SECRET as string;
      const decoded = jwt.verify(token, secretKey) as TokenPayload;
      req.userId = decoded.userId;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }
  };
};

export default authMiddleware;