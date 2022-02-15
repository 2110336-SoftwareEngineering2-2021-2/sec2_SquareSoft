import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body) {
        return await this.authService.login(body);
    }

    @Post('refresh-token')
    async refreshToken(@Body() body) {
        return await this.authService.refreshToken(body);
    }
}
