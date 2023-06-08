import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  // Passing the guard function, in this case from the nestjs/passport lib.
  // AuthGuard expects an identifier of the strategy to use.
  // In this case 'jwt' is created by default by passport in the strategy file.
  @UseGuards(AuthGuard('jwt'))
  @Get('me') // /users/me
  // The jwt strategy makes available a req.user obj with the payload data from the validate Fn in the strategy
  getMe(@Req() req: Request) {
    return req.user;
  }
}
