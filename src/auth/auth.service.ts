import { Injectable } from '@nestjs/common';
import { access } from 'fs';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

import { RegisterDto } from './dto/register.dto';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userservice: UsersService,
        private jwtService: JwtService
    ) {
    console.log('authService constructed');
  }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userservice.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      login(user: any): { access_token: string; user: any } {
        const payload = { sub: user.id, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
          user,
        };
      }
    
      async register(dto: RegisterDto): Promise<any> {
        const hash = await bcrypt.hash(dto.password, 10);
        const user = await this.userservice.create({
          ...dto,
          password: hash,
        });
    
        const { password, ...result } = user;
        return result;
      }
    }
 