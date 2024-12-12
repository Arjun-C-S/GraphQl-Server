import { z } from 'zod';

const createUserValidator = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(4).max(10),
});

type CreateUserType = z.infer<typeof createUserValidator>;

export { type CreateUserType, createUserValidator };
