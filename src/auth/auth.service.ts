import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signin() {
    // NestJS automatically convert the data type based on the return
    // returning a string would send a text/HTML as content type
    // returning an object would send a application/json as content type
    return { msg: 'Signed in' };
  }

  // Thx to the validation pipe, we are sure the dto has the correct data and type
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the DB
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
        // The select prop is an object that tells prisma which properties in the schema should return
        // A better solution is to create a transformer pipe to modify the returned object
        select: { id: true, email: true, createdAt: true },
      });
      // return the saved user
      return user;
    } catch (e) {
      // Checking if the error code is P2002, indicating that is trying to create a user that has a field
      // duplicated and is settled to unique that field
      if (e.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      throw e;
    }
  }
}
