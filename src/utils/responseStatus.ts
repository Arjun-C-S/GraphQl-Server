/**
 * Enumeration for HTTP response status codes
 *
 * This enum provides a clear mapping of common HTTP status codes to descriptive constants
 * for improved readability and maintainability in the codebase.
 *
 */

enum RESPONSE_STATUS {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRES = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    GONE = 410,
    LARGE_ENTITY = 413,
    UNSUPPORTED_MEDIA_TYPE = 415,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUEST = 429,
    INTERNAL_SERVER_ERROR = 500,
}

export { RESPONSE_STATUS };
