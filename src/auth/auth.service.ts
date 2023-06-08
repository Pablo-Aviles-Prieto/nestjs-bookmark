import {
  ForbiddenException,
  ImATeapotException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// NestJS automatically convert the data type based on the return
// returning a string would send a text/HTML as content type
// returning an object would send a application/json as content type
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signin(dto: AuthDto) {
    // findFirst will retrieve the first record by any field, and findUnique retrieve a record by unique fields like id
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new UnauthorizedException('Check the credentials');

    const passMatches = await argon.verify(user.hash, dto.password);
    if (!passMatches) throw new UnauthorizedException('Check the credentials');

    return this.signToken(user.id, user.email);
  }

  // Thx to the validation pipe, we are sure the dto has the correct data and type
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: { email: dto.email, hash },
        // The select prop is an object that tells prisma which properties in the schema should return
        // A better solution is to create a transformer pipe to modify the returned object
        select: { id: true, email: true, createdAt: true },
      });
      return this.signToken(user.id, user.email);
    } catch (e) {
      // Checking if the error code is P2002, indicating that is trying to create a user that has a field
      // duplicated and is settled to unique that field
      if (e.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }

      throw e;
    }
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId, // sub is a convention in JWT to store a unique identifier
      email,
    };

    const secretJWT = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret: secretJWT,
      expiresIn: '15m',
    });

    return {
      access_token: token,
    };
  }
}
