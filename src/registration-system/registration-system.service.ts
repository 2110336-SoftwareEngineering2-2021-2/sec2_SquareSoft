import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator, userProjectOwner } from './registration-system.model';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class RegistrationSystemService {
    constructor(
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwnerModel: Model<userProjectOwner>,
        @InjectModel('adminDB') private readonly adminModel: Model<any>
    ) { }

    async registerUserDonator(newRegistration: object) {
        const result = await this.registerUser(this.userDonatorModel, newRegistration);
        return result
    }

    async registerUserProjectOwner(newRegistration: object) {
        const result = await this.registerUser(this.userProjectOwnerModel, newRegistration);
        return result
    }

    async registerAdmin(newRegistration: object) {
        const result = await this.registerUser(this.adminModel, newRegistration);
        return result
    }

    async registerUser(model: Model<any>, newRegistration: object) {
        if (newRegistration["password"] === undefined) {
            throw new HttpException({
                "msg": "register failed: no password field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        newRegistration["hashpassword"] = await bcrypt.hash(newRegistration["password"], 12);
        delete newRegistration["password"];
        try {
            const newUser = new model(newRegistration);
            const result = await newUser.save();
            return {
                "status": "registration successful",
                "username": result["username"]
            };
        }
        catch (err) {
            throw new HttpException({
                "msg": "register failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getUserDonator(query: Object) {
        const result = await this.getUser(this.userDonatorModel, query);
        return result;
    }

    async getUserProjectOwner(query: Object) {
        const result = await this.getUser(this.userProjectOwnerModel, query);
        return result;
    }

    async getUser(model: Model<any>, query: Object) {
        Object.keys(query).forEach(function (el) {
            query[el] = 1;
        })
        if (Object.keys(query).length > 0) {
            delete query["hashpassword"];
            delete query["__v"];
        }
        else {
            query["hashpassword"] = 0;
            query["__v"] = 0;
        }
        const result = await model.find({}, query);
        return result;
    }

    async findByUsername(username: string, role: string): Promise<any> {
        let result = undefined;
        if (role === Role.Donator) {
            result = await this.userDonatorModel.findOne({ username: username });
        }
        else if (role === Role.ProjectOwner) {
            result = await this.userProjectOwnerModel.findOne({ username: username });
        }
        else if (role === Role.Admin) {
            result = await this.adminModel.findOne({ username: username });
        }
        else {
            throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
        }
        return result;
    }

    async findByID(userID: string, role: string): Promise<any> {
        let user = undefined;
        if (role === Role.Donator) {
            user = await this.userDonatorModel.findById(userID);
        }
        else if (role === Role.ProjectOwner) {
            user = await this.userProjectOwnerModel.findById(userID);
        }
        else if (role === Role.Admin) {
            user = await this.adminModel.findById(userID);
        }
        else {
            throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
        }
        return user;
    }
    async editPersonalDetails(userID: string, role: string, fields: Object){
        let personalDetails = await this.findByID(userID, role);
        for(let [field, value] of Object.entries(fields)){
            personalDetails[field] = value;
        }
        let result = await personalDetails.save()
        return result;
    }

}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string