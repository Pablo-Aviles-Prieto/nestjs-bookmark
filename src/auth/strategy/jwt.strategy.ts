import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
// We could provide a 2nd arg to PassportStrategy, and would be a name to identify the strategy
// in this case, it will infere it as 'jwt'
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  validate(payload: any) {
    // We can make any data transformation
    // The data returned is gonna be populated on the req.user, accessible from express
    // In this case we just pass the JWT payload with the data we signed it
    return payload;
  }
}
