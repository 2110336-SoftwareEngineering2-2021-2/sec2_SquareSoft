import { Injectable, HttpException, HttpStatus } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import { userProjectOwner } from "src/registration-system/registration-system.model"

@Injectable()
export class ProjectOwnerVerificationService {
  constructor(@InjectModel("userProjectOwner") private readonly userModel: Model<userProjectOwner>) {}

  async getProjectOwnerById(id: string): Promise<userProjectOwner> {
    const user = await this.userModel.findById(id).exec()

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND)
    return user
  }

  async getVerificationList(start: number, end: number): Promise<[number, userProjectOwner[]]> {

    let user = await this.userModel.find({ verification_status: "Submitted" }, { _id: 1, firstname: 1, lastname: 1})
    const length = user.length
    if (start !== undefined) {
      start = Number(start)
      if (end === undefined) user = user.slice(start)
      else {
        end = Number(end)
        user = user.slice(start, end)
      }
    }

    return [length, user]
  }
  async setVerificationStatus(id: string, isApprove: boolean): Promise<userProjectOwner> {

    const setBlock = isApprove
      ? { verification_status: "Verified" }
      : { verification_status: "Rejected"}

    const user = await this.userModel.findByIdAndUpdate(id, { $set: setBlock }, { new: true, strict: false })

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

    return user
  }

}