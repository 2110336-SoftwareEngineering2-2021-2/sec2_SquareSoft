import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";
import { Role } from "../enums/role.enum";
import { userDonator } from  "../registration-system/registration-system.model"

export class mockUserDonator{
    _id: string;
    __v: number;
    username: string;
    hashpassword: string;
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
    bankAccountFirstname: string;
    bankAccountLastname: string;
    bankAccountNumber: string;
    bankAccountBank: string;
    balance: number;

    isSave: boolean;
    saveFail: boolean;

    constructor(saveFail: boolean = false) {
        this._id = "6211ee3676731e3fdac6f37f",
        this.username = "test",
        this.hashpassword = "$2a$12$IXn2B.nXmvpuooDv.2T6Ku7MNXuMI10St.tDGj/QRLKljbw.rFs5e",
        this.firstname = "test",
        this.lastname = "test",
        this.email = "test@gmail.com",
        this.bankAccountFirstname = "test",
        this.bankAccountLastname = "test",
        this.bankAccountNumber = "123123123",
        this.bankAccountBank = "kbank",
        this.__v = 0,
        this.balance = 44.512

        this.isSave = false;
        this.saveFail = saveFail;
    }

    public clone(): any {
        let cloneObj = new (this.constructor() as any);
        for (let attribut in this) {
            cloneObj[attribut] = this[attribut];
        }
        return cloneObj;
    }
    
    save(){
        if (this.saveFail){
            throw new HttpException(
                {
                  msg: "register failed: database error",
                },
                HttpStatus.UNPROCESSABLE_ENTITY
              );
        }
        this.isSave = true;
    }
}

// class mockeRegistrationSystemService{
//     userDonator: mockUserDonator;

//     constructor() {
//         this.userDonator = new mockUserDonator(this);
//     }

//     async findByUsername(username: string, role: string): Promise<any> {
//         let result = undefined;
//         if (role === Role.Donator) {
//             //result = await this.userDonatorModel.findOne({ username: username });
//             result = this.userDonator.clone();
//         }
//         else if (role === Role.ProjectOwner) {
//             //result = await this.userProjectOwnerModel.findOne({ username: username });
//         }
//         else if (role === Role.Admin) {
//             //result = await this.adminModel.findOne({ username: username });
//         }
//         else {
//             throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
//         }
//         return result;
//     }

//     async findByID(userID: string, role: string): Promise<any> {
//         let user = undefined;
//         if (role === Role.Donator) {
//             //user = await this.userDonatorModel.findById(userID);
//             user = this.userDonator.clone();
//         }
//         else if (role === Role.ProjectOwner) {
//             //user = await this.userProjectOwnerModel.findById(userID);
//         }
//         else if (role === Role.Admin) {
//             //user = await this.adminModel.findById(userID);
//         }
//         else {
//             throw new BadRequestException("Role can be only '" + Role.Donator + "', '" + Role.ProjectOwner + "' or '" + Role.Admin + "' not '" + role + "'");
//         }
//         return user;
//     }

// }

const mockeRegistrationSystemService = {
    findByUsername : jest.fn(),
    findByID : jest.fn(),
}
  
export default mockeRegistrationSystemService;