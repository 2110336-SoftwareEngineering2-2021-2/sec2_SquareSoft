import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AllRoleGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AllRoleGuard)
    @Post('refresh-token')
    async refreshToken(@Request() req) {
        return await this.authService.login(req.user);
    }

    // Example usage of JwtAuthGuard
    // req.user will contain "username" and "role"
    @UseGuards(AllRoleGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
