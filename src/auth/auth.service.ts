import { BadRequestException, HttpException, HttpStatus, Injectable, PreconditionFailedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { RegistrationSystemService } from '../../src/registration-system/registration-system.service';






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

    async changePassword(user: any, body: any){
        const oldPass = body["oldPass"];
        const newPass = body["newPass"];

        // Check if both old password and new password exist in the body
        // Also check for empty string
        if(oldPass && newPass && (oldPass.length !== 0) && (newPass.length !== 0)){
            // Check for duplicate old and new password
            if(oldPass === newPass) throw new BadRequestException("New pasword must not be the same as old password.");
          
            const userObject = await this.registrationSystemService.findByID(user._id, user.role);

            // We do not have to check if user really exist because we have already done that in the Role Guard
            if(await compare(oldPass, userObject.hashpassword)){                
                userObject.hashpassword = await hash(newPass, 12);

                try {
                  userObject.save();
                  return "Password changed successfully.";
                } catch (error) {
                  throw new HttpException(
                    {
                      msg: "register failed: database error",
                      err: error,
                    },
                    HttpStatus.UNPROCESSABLE_ENTITY
                  );
                }
            } else throw new PreconditionFailedException("Old password is incorrect.");
        } else throw new BadRequestException("Please provide old password and new password.")
    }

}
