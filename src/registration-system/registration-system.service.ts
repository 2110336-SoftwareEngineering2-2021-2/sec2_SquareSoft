import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from '../enums/role.enum';
import * as bcrypt from 'bcryptjs'

class userProjectOwner{
    username: string;
    email: string;
    hashpassword: string;
    firstname: string;
    lastname: string;
    idCardNumber: string;
    birthdate: string;

    address: string;
    province: string;
    district: string;
    subdistrict: string;
    postcode: string;

    bankAccountName: string;
    bankAccountNumber: string;
    bankAccountBank: string;

    bankBookPicture: string;
    idCardPicture: string;

    verification_status: string;

    balance: number;
    register_service :RegistrationSystemService;
    _id : string;
    v : number;

    constructor(
        register_service : RegistrationSystemService,
        user : Object

    ){
      this.register_service = register_service;
      this.username = user["username"];
      this.email = user["email"];
      this.hashpassword = user["hashpassword"];
      this.firstname = user["firstname"]; 
      this.lastname = user["lastname"];
      this.idCardNumber = user["idCardNumber"];
      this.birthdate = user["birthdate"];
      this.address = user["address"];
      this.province = user["province"];
      this.district = user["district"];
      this.subdistrict = user["subdistrict"];
      this.postcode = user["postcode"];
      this.bankAccountName = user["bankAccountName"];
      this.bankAccountNumber = user["bankAccountNumber"];
      this.bankAccountBank = user["bankAccountBank"];
      this._id = user["_id"];
      this.v = user["__v"];
    }
    save(){
      this.register_service.poMock["username"] = this.username;
      this.register_service.poMock["email"] = this.email;
      this.register_service.poMock["hashpassword"] = this.hashpassword;
      this.register_service.poMock["firstname"] = this.firstname;
      this.register_service.poMock["lastname"] = this.lastname;
      this.register_service.poMock["idCardNumber"] = this.idCardNumber;
      this.register_service.poMock["birthdate"] = this.birthdate;
      this.register_service.poMock["address"] = this.address;
      this.register_service.poMock["province"] = this.province;
      this.register_service.poMock["district"] = this.district;
      this.register_service.poMock["subdistrict"] = this.subdistrict;
      this.register_service.poMock["postcode"] = this.postcode;
      this.register_service.poMock["bankAccountName"] = this.bankAccountName;
      this.register_service.poMock["bankAccountNumber"] = this.bankAccountNumber;
      this.register_service.poMock["bankAccountBank"] = this.bankAccountBank;
    }
  }
@Injectable()
export class RegistrationSystemService {
    donatorMock: Object;
    poMock: Object;
    adminMock: Object;

    constructor(
    ) { this.donatorMock = {
        "_id": {
          "$oid": "6211ee3676731e3fdac6f37f"
        },
        "username": "test",
        "hashpassword": "$2a$12$IXn2B.nXmvpuooDv.2T6Ku7MNXuMI10St.tDGj/QRLKljbw.rFs5e",
        "firstname": "test",
        "lastname": "test",
        "birthdate": {
          "$date": "2022-12-09T00:00:00Z"
        },
        "email": "test@gmail.com",
        "bankAccountFirstname": "test",
        "bankAccountLastname": "test",
        "bankAccountNumber": "123123123",
        "bankAccountBank": "kbank",
        "__v": 0,
        "balance": 44.512
      } ,
        this.poMock = {  "_id": {    "$oid": "62175434ef214c6938e65755"  },  "username": "test",  "email": "test@gmail.com",  "hashpassword": "$2a$12$REMyZb6OQzmsjEpCRiQ0Lep/JsteEA52nQyxSpB1pgRKNewNTfYgS",  "firstname": "test",  "lastname": "test",  "idCardNumber": "13221312",  "birthdate": {    "$date": "2019-02-17T17:00:00Z"  },  "address": "55 Phatthana road 5/5 alley Kuhasawan Sub-district",  "province": "Phatthalung",  "district": "asdfasd",  "subdistrict": "13asd24sad12214sda23",  "postcode": "93000",  "bankAccountName": "asdfasdfadsfd",  "bankAccountNumber": "4791748174891",  "bankAccountBank": "asdfasdfa",  "bankBookPicture": "sdassda 132",  "idCardPicture": "sadko1zxsadsadczx24as 124144 j",  "verification_status": "Rejected",  "balance": 1200,  "__v": 0},
        this.adminMock = {  "_id": {    "$oid": "620cb8c950e28aa66fba1453"  },  "username": "admin",  "hashpassword": "$2a$12$ktw7fumW3QTvpoVVDJiAMeSwRCaR40ZKnlJkagwLpw1SP99nbmz3u",  "__v": 0} 
}

    async findByUsername(username: string, role: string): Promise<any> {
        // let result = undefined;
        // if (role === Role.Donator) {
        //     result = await this.userDonatorModel.findOne({ username: username });
        // }
        // else if (role === Role.ProjectOwner) {
        //     result = await this.userProjectOwnerModel.findOne({ username: username });
        // }
        // else if (role === Role.Admin) {
        //     result = await this.adminModel.findOne({ username: username });
        // }
        // else {
        //     throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
        // }
        // return result;
        return "fuck maew"
    }

    async findByID(userID: string, role: string): Promise<any> {
        let user = undefined;
        if (role === Role.Donator) {
            // user = await this.userDonatorModel.findById(userID);
            user = undefined;
        }
        else if (role === Role.ProjectOwner) {
            // user = await this.userProjectOwnerModel.findById(userID);
            user = new userProjectOwner(this, this.poMock);
        }
        else if (role === Role.Admin) {
            // user = await this.adminModel.findById(userID);
            user = undefined;
        }
        else {
            throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
        }
        return user;
    }

    
}
// username: string, hashpassword: string, firstname: string, lastname: string, birthdate: string, email: string, bankAccountFirstname: string, bankAccountLastname: string, bankAccountNumber: string, bankAccountBank: string