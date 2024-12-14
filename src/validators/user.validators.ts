import { z } from 'zod';

/**
 * Validation schema for creating a new user
 *
 * This schema defines the structure and constraints for the input data
 * when creating a user. It ensures that the `email` and `password` fields
 * meet the required criteria.
 */

const createUserValidator = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(4).max(10),
});

type CreateUserType = z.infer<typeof createUserValidator>;

export { type CreateUserType, createUserValidator };
