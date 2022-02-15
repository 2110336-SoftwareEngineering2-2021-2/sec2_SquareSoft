import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';

@Injectable()
export class AuthService {
    constructor(
        private registrationSystemService: RegistrationSystemService,
        private jwtService: JwtService
    ) { }

    async validateUser(role: string, username: string, password: string): Promise<any> {
        const user = await this.registrationSystemService.getUserForLogin(username, role);
        if (user && await compare(password, user.hashpassword)) {
            const { hashpassword, ...result } = user.toObject();
            result.role = role;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }
}
