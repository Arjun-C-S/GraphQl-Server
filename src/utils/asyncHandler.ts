import type { Request, Response, NextFunction } from 'express';

import { logger } from '../logging/logger.js';

/**
 * Asynchronous middleware handler wrapper
 *
 * This utility function wraps an asynchronous Express route handler or middleware,
 * automatically catching errors and passing them to the `next` function for error handling.
 *
 * @param handler - The asynchronous handler function to wrap
 * @returns A wrapped handler function with error handling
 *
 */

function asyncHandler(handler: (req: Request, res: Response, next: NextFunction) => void) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(handler(req, res, next)).catch((error: Error) => {
            logger.error(error.message);
            next(error);
        });
    };
}

export { asyncHandler };
