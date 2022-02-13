import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { Admin } from "src/admin/admin.model"

@Injectable()
export class AdminService {
  constructor(@InjectModel("Admin") private readonly adminModel: Model<Admin>) {}

  async getAdminById(id: string): Promise<Admin> {
    const user = await this.adminModel.findById(id).exec()

    if (!user) throw new HttpException("Admin not found", HttpStatus.NOT_FOUND)
    return user
  }

 
}