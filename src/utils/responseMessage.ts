/**
 * Response message constants
 *
 * This object contains predefined messages used in the application for
 * consistent and user-friendly responses. Messages are grouped by domain
 * (e.g., MOVIE, USER, OTHER) for better organization.
 *
 */

const responseMessage = {
    MOVIE: {
        CREATED: 'Movie successfully created...',
        UPDATED: 'Movie updated successfully...',
        DELETED: 'Movie deleted successfully...',
        NOT_FOUND: 'No movie found!!!',
    },
    USER: {
        LOGGED_IN: 'User successfully logged in.',
    },
    OTHER: {
        SERVER_ERROR: 'Internal Server Error',
    },
} as const;

export { responseMessage };
