import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDonator, userProjectOwner } from './registration-system.model';
const bcrypt = require ('bcrypt');

@Injectable()
export class RegistrationSystemService {
    constructor(
        @InjectModel('userDonator') private readonly userDonatorModel: Model<userDonator>,
        @InjectModel('userProjectOwner') private readonly userProjectOwnerModel: Model<userProjectOwner>,
        @InjectModel('adminDB') private readonly adminModel: Model<any>
    ) {}

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
        if ( newRegistration["password"] === undefined ){
            throw new HttpException({
                "msg": "register failed: no password field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        newRegistration["hashpassword"]  = await bcrypt.hash(newRegistration["password"], 12);
        delete newRegistration["password"];
        try{
            const newUser = new model(newRegistration);
            const result = await newUser.save();
            return {
                "status": "registration successful",
                "username": result["username"]
            };
        }
        catch(err){
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

    async getUserForLogin(username: String, role: string) {
        let result = undefined;
        if ( role === "Donator" ) {
            result = await this.userDonatorModel.findOne({ username: username });
        }
        else if ( role === "ProjectOwner" ) {
            result = await this.userProjectOwnerModel.findOne({ username: username });
        }
        else if ( role === "Admin" ) {
            result = await this.adminModel.findOne({ username: username });
        }
        else {
            throw new BadRequestException("Role can be only 'Donator', 'ProjectOwner' or 'Admin' not '" + role + "'");
        }
        return result;
    }

}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string