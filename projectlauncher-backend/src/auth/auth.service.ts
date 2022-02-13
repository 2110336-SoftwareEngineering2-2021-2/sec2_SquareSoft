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
        const user = await this.registrationSystemService.getUserForLogin(dto["username"]);

        if (!user) {
            throw new BadRequestException("Incorrect username or password.");
        } else {
            const isMatch = await compare(dto["password"], user["hashpassword"]);
            if (isMatch) {
                const payload = { username: user["username"] }
                return this.jwtService.sign(payload);
            } else {
                throw new BadRequestException("Incorrect username or password.");
            }
        }
    }
}
