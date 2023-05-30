import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
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
