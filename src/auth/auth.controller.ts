import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // POST /auth/signin
  @Post('signin')
  // @HttpCode(204) // Would return 204 as status code
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  // POST /auth/signup
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }
}
