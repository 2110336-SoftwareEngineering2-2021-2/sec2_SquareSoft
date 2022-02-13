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
    const queryBlock = []

    queryBlock.push({ $or: [{ verification_status: "Submitted" }] })

    let user = await this.userModel.find({ $and: queryBlock }, { _id: 1, name_en: 1, surname_en: 1, username: 1, name_th: 1, surname_th: 1 })
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

  async setPaymentstatus(id: string, isApprove: boolean, newExpiredDate?: Date): Promise<userProjectOwner> {
    if (isApprove && newExpiredDate === null) throw new HttpException("Cannot find newExpiredDate in req.body", HttpStatus.BAD_REQUEST)

    const setBlock = isApprove ? { document_status: "NotSubmitted", account_expiration_date: newExpiredDate } : { document_status: "Rejected" }

    const user = await this.userModel.findByIdAndUpdate(id, { $set: setBlock }, { new: true, strict: false })

    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND)

    return user
  }
}