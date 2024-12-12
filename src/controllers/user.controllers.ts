import type { Request, Response } from 'express';

import { generateToken } from '@/middlewares/jwtValidator.js';
import { ApiError } from '@/utils/apiError.js';
import { apiResponse } from '@/utils/apiResponse.js';
import { asyncHandler } from '@/utils/asyncHandler.js';
import { responseMessage } from '@/utils/responseMessage.js';
import { RESPONSE_STATUS } from '@/utils/responseStatus.js';
import { createUserValidator, type CreateUserType } from '@/validators/user.validators.js';

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    const result = createUserValidator.safeParse(body);

    if (!result.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: result.error.issues,
        });
    }

    const { email, password } = body as CreateUserType;

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: { token: generateToken({ email, password }) },
        message: responseMessage.USER.LOGGED_IN,
    });
});

export { loginUser };
