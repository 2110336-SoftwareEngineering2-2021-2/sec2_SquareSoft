import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as RoleGuard from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('refresh-token')
    async refreshToken(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('change-password')
    async changePassword(@Request() req){
        return await this.authService.changePassword(req.user, req.body);
    }

    // Example usage of JwtAuthGuard
    // req.user will contain "username" and "role"
    @UseGuards(RoleGuard.AllRoleGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
