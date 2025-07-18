import { Controller, Post, UnauthorizedException,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('login')
    async login(@Body() dto: LoginDto){
        const user = await this.authService.validateUser(dto.email, dto.password);
        if(!user) throw new UnauthorizedException('invalid credentials');
        return this.authService.login(user)
    }

    @Post('register')
    async register(@Body() dto: RegisterDto){
        return this.authService.register(dto);
    }
}
