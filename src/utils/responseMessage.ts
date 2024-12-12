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
