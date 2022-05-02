import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import mockJwtService from '../testUtil/mockJwtService';
import { RegistrationSystemService } from '../registration-system/registration-system.service';
//import mockRegistrationSystemService from '../testUtil/mockRegistrationSystemService';
import { AuthService } from './auth.service';
import { compare, hash } from 'bcryptjs';
import { Role } from '../enums/role.enum';
import { Body, HttpException, HttpStatus } from '@nestjs/common';
import { mockUserDonator } from '../testUtil/mockRegistrationSystemService';

const mockRegistrationSystemService = {
  findByUsername : jest.fn(),
  findByID : jest.fn()
}

class User{
  _id: string;
  role: Role;
  username: string;

  constructor (_id: string, role: Role, username: string) {
    this._id = _id;
    this.role = role;
    this.username = username;
  }
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RegistrationSystemService,
          useValue: mockRegistrationSystemService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('change password', () => {
    let mockUserDo =  new mockUserDonator()

    beforeEach(async () => {
      mockRegistrationSystemService.findByID.mockResolvedValue(
        mockUserDo
      );
    });

    let userID = "6211ee3676731e3fdac6f37f";
    let userRole = Role.Donator;
    let oldPass = "test";
    let newPass = "test1";

    it('should return "Test mock"', async () => {
      let f = await service.changePassword(new User(userID, userRole, oldPass), {
        "oldPass": oldPass,
        "newPass": newPass
      });

      expect(mockRegistrationSystemService.findByID).toBeCalledWith(
        userID,
        userRole
      )

      let isSamePassword = await compare(newPass, mockUserDo.hashpassword);

      expect(isSamePassword).toBe(true);

      expect(f).toBe("Password changed successfully.");
    });
  });


  describe('change password fail because database error', () => {
    let mockUserDo =  new mockUserDonator(true)

    beforeEach(async () => {
      mockRegistrationSystemService.findByID.mockResolvedValue(
        mockUserDo
      );
    });

    let userID = "6211ee3676731e3fdac6f37f";
    let userRole = Role.Donator;
    let oldPass = "test";
    let newPass = "test1";

    it('should fail to change password because database error', async () => {
      let error2 = undefined;
      try{
        let f = await service.changePassword(new User(userID, userRole, oldPass), {
          "oldPass": oldPass,
          "newPass": newPass
        });
      } catch (error) {
        error2 = error
      }

      expect(error2.getStatus()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
      expect(mockRegistrationSystemService.findByID).toBeCalledWith(
        userID,
        userRole
      )
      
    });
  });


  describe('change password fail because old password is the same as new password', () => {
    let mockUserDo =  new mockUserDonator()

    beforeEach(async () => {
      mockRegistrationSystemService.findByID.mockResolvedValue(
        mockUserDo
      );
    });

    let userID = "6211ee3676731e3fdac6f37f";
    let userRole = Role.Donator;
    let oldPass = "test";
    let newPass = "test";

    it('should fail to change password because old password is the same as new password', async () => {
      let error2 = undefined;
      try{
        let f = await service.changePassword(new User(userID, userRole, oldPass), {
          "oldPass": oldPass,
          "newPass": newPass
        });
      } catch (error) {
        error2 = error
      }

      expect(error2.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      
    });
  });


  describe('change password fail because old password is incorrect', () => {
    let mockUserDo =  new mockUserDonator()

    beforeEach(async () => {
      mockRegistrationSystemService.findByID.mockResolvedValue(
        mockUserDo
      );
    });

    let userID = "6211ee3676731e3fdac6f37f";
    let userRole = Role.Donator;
    let oldPass = "test555";
    let newPass = "test1";

    it('should fail to change password because old password is incorrect', async () => {
      let error2 = undefined;
      try{
        let f = await service.changePassword(new User(userID, userRole, "test"), {
          "oldPass": oldPass,
          "newPass": newPass
        });
      } catch (error) {
        error2 = error
      }

      expect(error2.getStatus()).toBe(HttpStatus.PRECONDITION_FAILED);
      expect(mockRegistrationSystemService.findByID).toBeCalledWith(
        userID,
        userRole
      )
      
    });
  });


  describe('change password fail because bad request', () => {
    let mockUserDo =  new mockUserDonator()

    beforeEach(async () => {
      mockRegistrationSystemService.findByID.mockResolvedValue(
        mockUserDo
      );
    });

    let userID = "6211ee3676731e3fdac6f37f";
    let userRole = Role.Donator;
    let oldPass = "test555";
    let newPass = "test1";

    it('should fail to change password because bad request', async () => {
      let error2 = undefined;
      try{
        let f = await service.changePassword(new User(userID, userRole, "test"), {
          "newPass": newPass
        });
      } catch (error) {
        error2 = error
      }

      expect(error2.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      
    });
  });
});
