import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin() {
    // NestJS automatically convert the data type based on the return
    // returning a string would send a text/HTML as content type
    // returning an object would send a application/json as content type
    return { msg: 'Signed in' };
  }

  signup() {
    return { msg: 'Signed up' };
  }
}
