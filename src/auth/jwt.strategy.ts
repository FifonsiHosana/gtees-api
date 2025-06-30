import { Injectable, } from "@nestjs/common";
import { PassportStrategy, } from '@nestjs/passport';
import { ExtractJwt,Strategy} from "passport-jwt";
import { ConfigService } from '@nestjs/config';
// import { Strategy,ExtractJwt } from 'passport-local';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  sign(payload: { sub: any; role: any; }): string {
      throw new Error('Method not implemented.');
  }
  constructor(configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is not set');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:jwtSecret,
    });
  } 

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return { id: payload.sub, role: payload.role };
  }
}
// constructor() {
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       throw new Error('JWT_SECRET environment variable is not set');
//     }
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: true, // Set to true to ignore expiration for testing purposes
//       secretOrKey: jwtSecret,
//     });
//   }

//   async validate(payload: any) {
//     console.log('JWT payload:', payload);
//     return { id: payload.sub, role: payload.role };
//   }
// }
