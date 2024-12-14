// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request } from 'express';

/**
 * Extending the Express Request interface
 *
 * This declaration augments the global Express namespace to include a custom
 * `user` property in the `Request` interface. This is useful when you want to
 * add application-specific properties to the `Request` object.
 *
 * Example: Storing user information after authentication.
 *
 */
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}
