import { BadRequestException, Injectable, PreconditionFailedException } from '@nestjs/common';
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
        const user = await this.registrationSystemService.findByUsername(username, role);
        if (user && await compare(password, user.hashpassword)) {
            const { hashpassword, ...result } = user.toObject();
            result.role = role;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { _id: user._id, username: user.username, role: user.role };
        return { access_token: this.jwtService.sign(payload) };
    }

    async changePassword(user: any, body: Body){
        console.log(user._id)
        console.log(typeof user._id)
        console.log(user.username)
        console.log(typeof user.username)
        console.log(user.role)
        console.log(typeof user.role)
        console.log(body["oldPass"])
        console.log(body["newPass"])

        const oldPass = body["oldPass"];
        const newPass = body["newPass"];

        if(oldPass && newPass){
            const userObject = await this.registrationSystemService.findByID(user._id, user.role);
            if(await compare(oldPass, userObject.hashpassword)) return "password matched!";
            else throw new PreconditionFailedException("Old password is incorrect.");

            // const ret = this.registrationSystemService.changePassword(user._id, user.username, user.role, oldPass, newPass);


        } else throw new BadRequestException("Please provide old password and new password.")
    }
}
