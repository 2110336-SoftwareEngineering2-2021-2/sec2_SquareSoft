import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator, userProjectOwner } from './registration-system.model';

@Injectable()
export class RegistrationSystemService {
    constructor(
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwner: Model<userProjectOwner>
    ) {}

    async registerUserDonator(newRegistration: object) {
        const newUserDonator = new this.userDonatorModel(newRegistration);
        const result = await newUserDonator.save();
        return result
    }

    async registerUserProjectOwner(newRegistration: object) {
        const newUserProjectOwner = new this.userProjectOwner(newRegistration);
        const result = await newUserProjectOwner.save();
        return result
    }
}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string