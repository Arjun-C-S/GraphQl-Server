import type { NextFunction, Request, Response } from 'express';

import { type APIErrorType, ApiError } from '@/utils/apiError.js';
import { responseMessage } from '@/utils/responseMessage.js';

/**
 * Global error handler middleware for Express
 *
 * This middleware catches all errors thrown in the application,
 * checks if they are instances of `ApiError`, and formats the response
 * with the appropriate HTTP status code and message.
 * If the error is not an instance of `ApiError`, a generic server error is returned.
 *
 * @param error - The error object that was thrown
 * @param _req - The incoming HTTP request (not used here)
 * @param res - The HTTP response object
 * @param _next - The next middleware function (not used here)
 * @returns A JSON response with the error message and appropriate status code
 *
 */

const errorHandler = (error: APIErrorType, _req: Request, res: Response, _next: NextFunction) => {
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || responseMessage.OTHER.SERVER_ERROR;

        error = new ApiError(statusCode, message);
    }

    return res.status(error.statusCode).json({ message: error.message });
};

export { errorHandler };
