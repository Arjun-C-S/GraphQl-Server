import type { GraphQLFormattedError } from 'graphql';

/**
 * Custom error formatting function for GraphQL
 *
 * This function formats GraphQL errors to provide a consistent structure
 * for error responses, including a message and an optional error code.
 *
 * @param formattedError - The default formatted error provided by GraphQL
 * @param _error - The original error object (currently unused)
 * @returns An object containing the formatted error message and code
 *
 */

export const formatError = (formattedError: GraphQLFormattedError, _error: unknown) => {
    return {
        message: formattedError.message || 'Internal server error',
        code: formattedError.extensions?.code,
    };
};
