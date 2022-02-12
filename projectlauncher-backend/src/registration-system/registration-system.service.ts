import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator, userProjectOwner } from './registration-system.model';

@Injectable()
export class RegistrationSystemService {
    constructor(
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwnerModel: Model<userProjectOwner>
    ) {}

    async registerUserDonator(newRegistration: object) {
        const newUserDonator = new this.userDonatorModel(newRegistration);
        const result = await newUserDonator.save();
        return result
    }

    async registerUserProjectOwner(newRegistration: object) {
        const newUserProjectOwner = new this.userProjectOwnerModel(newRegistration);
        const result = await newUserProjectOwner.save();
        return result
    }

    async getUserDonator(query: Object) {
        const result = await this.getUser(this.userDonatorModel, query);
        return result;
    }

    async getUserProjectOwner(query: Object){
        const result = await this.getUser(this.userProjectOwnerModel, query);
        return result;
    }

    async getUser(model: Model<any>, query: Object) {
        Object.keys(query).forEach(function(el){
            query[el] = 1;
        })
        if(Object.keys(query).length > 0){
            delete query["hashpassword"];
            delete query["__v"];
        }
        else{
            query["hashpassword"] = 0;
            query["__v"] = 0;
        }
        const result = await model.find({}, query);
        return result;
    }

}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string