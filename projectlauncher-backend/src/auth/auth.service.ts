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
        return {
            status: "login successful",
            tokenType: "JWT",
            access_token: this.jwtService.sign(payload),
        };
    }

    verifyToken(token: string) {
        const res = this.jwtService.verify(token);
        // console.log(res);
        return res;
    }

    refreshToken(dto: Object) {
        const token = dto['token'];
        // console.log("START",token);
        const username = this.verifyToken(token)['username'];
        const role = this.verifyToken(token)['role'];
        // console.log(username,role);
        if (username && role) {
            const payload = { username: username, role: role };
            return {
                "status": "refresh token successful!",
                "tokenType": "JWT",
                "accessToken": this.jwtService.sign(payload)
            }
        }
        else throw new BadRequestException("Token error!");
    }
}
