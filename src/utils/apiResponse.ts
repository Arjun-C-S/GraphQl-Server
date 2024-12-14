import type { Response } from 'express';

import { RESPONSE_STATUS } from '@/utils/responseStatus.js';

/**
 * Utility function for sending standardized API responses
 *
 * This function simplifies sending JSON responses with a given HTTP status code and data payload.
 *
 * @param res - The Express `Response` object used to send the response
 * @param statusCode - An HTTP status code from the `RESPONSE_STATUS` enum
 * @param data - The response data to send (can be any serializable object or primitive)
 * @returns The response sent back to the client
 *
 */

function apiResponse(res: Response, statusCode: RESPONSE_STATUS, data: any) {
    return res.status(statusCode).json(data);
}
export { apiResponse };
