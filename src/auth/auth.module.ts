// nest g module prisma create a module called prisma in this case
// nest g service prisma creates the service. If --no-spec flag is passed, it wont create the .spec test file

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  // This JwTModule is configurable passing options to the obj, or can be configured later in the service for example
  imports: [JwtModule.register({})], // Handles the JWT signing
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
