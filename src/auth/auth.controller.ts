import { Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/signin
  @Post('signin')
  // @HttpCode(204) // Would return 204 as status code
  signin() {
    return this.authService.signin();
  }

  // POST /auth/signup
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
}
