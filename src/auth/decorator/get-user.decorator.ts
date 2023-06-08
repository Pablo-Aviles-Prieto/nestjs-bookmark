import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

// The data arg is the payload we can pass as arg to the @GetUser() decorator when being called
export const GetUser = createParamDecorator(
  (data: keyof User | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    // If we pass the data arg, it only returns the user property passed
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
