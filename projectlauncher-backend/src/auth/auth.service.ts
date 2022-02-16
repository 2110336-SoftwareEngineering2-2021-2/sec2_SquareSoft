import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RegistrationSystemService } from 'src/registration-system/registration-system.service';

@Injectable()
export class AuthService {
    constructor(
        private registrationSystemService: RegistrationSystemService,
        private jwtService: JwtService
    ) { }

    async login(dto: Object) {
        const user = await this.registrationSystemService.getUserForLogin(dto["username"], dto["role"]);

        if (!user) {
            throw new BadRequestException("Incorrect username or password.");
        } else {
            const isMatch = await compare(dto["password"], user["hashpassword"]);
            if (isMatch) {
                const payload = { username: user["username"], role: dto["role"] };
                return {
                    "status": "login successful",
                    "tokenType": "JWT",
                    "accessToken": this.jwtService.sign(payload)
                }
            } else {
                throw new BadRequestException("Incorrect username or password.");
            }
        }
    }
    verifyToken(token: string) {
        const res= this.jwtService.verify(token);
        console.log(res);
        return res;
    }
    refreshToken(dto: Object) {
        const token=dto['token'];
        console.log("START FUCKING",token);
        const username= this.verifyToken(token)['username'];
        const role= this.verifyToken(token)['role'];
        console.log(username,role);
        if (username&&role) {
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


