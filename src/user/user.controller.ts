import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

// Passing the guard function, in this case from the nestjs/passport lib.
// AuthGuard expects an identifier of the strategy to use.
// In this case 'jwt' is created by default by passport in the strategy file.
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('me') // /users/me
  // To use this decorator, the route has to be using the JwtGuard
  getMe(@GetUser() user: User, @GetUser('email') email: string) {
    console.log({ email });
    return user;
  }

  // @Patch()
  // editUser() {}
}
