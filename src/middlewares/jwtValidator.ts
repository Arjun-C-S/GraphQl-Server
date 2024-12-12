import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { logger } from '@/logging/logger.js';
import { ApiError } from '@/utils/apiError.js';
import { RESPONSE_STATUS } from '@/utils/responseStatus.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (payload: { email: string; password: string }) => {
    try {
        const JWT_EXPIRATION = '1h'; // Token expiration time, e.g., 1 hour

        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    } catch (error) {
        logger.error(error);
        throw new ApiError(RESPONSE_STATUS.INTERNAL_SERVER_ERROR, {
            message: 'Internal Server Error',
        });
    }
};

const authenticateJWT = (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ')[1];

        if (!token) {
            throw new ApiError(RESPONSE_STATUS.UNAUTHORIZED, {
                message: 'Unauthorized access!!!',
            });
        }

        const { email } = jwt.verify(token, JWT_SECRET) as { email: string };

        req.user = email;

        next();
    } catch (error) {
        logger.error(error);
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: 'Forbidden access!!!',
        });
    }
};

export { generateToken, authenticateJWT };
