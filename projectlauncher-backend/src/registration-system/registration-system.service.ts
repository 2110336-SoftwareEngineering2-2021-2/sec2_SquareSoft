import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator } from './registration-system.model';

@Injectable()
export class RegistrationSystemService {
    constructor(@InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>) {}

    async registerUserDonator(newRegistration: object) {
        const newUserDonator = new this.userDonatorModel(newRegistration);
        const result = await newUserDonator.save();
        //console.log(result);
        return result
    }
}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string