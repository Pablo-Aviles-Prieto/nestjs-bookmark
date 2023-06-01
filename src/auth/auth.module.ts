// nest g module prisma create a module called prisma in this case
// nest g service prisma creates the service. If --no-spec flag is passed, it wont create the .spec test file

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
