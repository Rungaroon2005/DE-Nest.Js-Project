/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Use fallback key for development
    const secretKey =
      process.env.JWT_SECRET_KEY ||
      'p/PjbZCRpIWrYP/IgK18rHKUZ9ihMjwIyVzQji2gzeyYMG6N4nBh74ZW5aI9HJkK';

    // Log what we're using (for debugging)
    console.log(
      'Using JWT secret key:',
      process.env.JWT_SECRET_KEY ? 'from environment' : 'fallback value',
    );

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    return { user_id: payload.user_id, email: payload.email };
  }
}
