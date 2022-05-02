import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, model } from 'mongoose';
import { notification } from './notification.model';
import { Mongoose } from 'mongoose';
@Injectable()
export class NotificationService {
    
    constructor(
        @InjectModel('notification') private readonly notificationModel: Model<notification>
    ) { }
    
    async findByOwnerID(query: any) {
        try{
            let queryBlock={ owner: query['owner']}
            
            const result=await this.notificationModel.find(queryBlock).exec();
            return [result.length,result];
        }
        catch(err){
            throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }

    async deleteNotification(queryBlock: any) {
        if(!Mongoose.prototype.isValidObjectId(queryBlock._id))
            throw new HttpException("Please send valid objectID", HttpStatus.BAD_REQUEST)
        try{
            
            const result=await this.notificationModel.deleteOne(queryBlock).exec();
            return result;
        }
        catch(err){

            throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
        
    }


    async createNotification(newNotification: object) {
        if (newNotification["notificationType"] === undefined) {
            throw new HttpException({
                "msg": "create failed: no notificationType field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (newNotification["owner"] === undefined) {
            throw new HttpException({
                "msg": "create failed: no owner field"
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (newNotification["notificationType"] === "rejectedVerification") 
            newNotification["text"] = "การยืนยันตัวตนของคุณผิดพลาด โปรดกรอกข้อมูลใหม่ เพื่อทำการยืนยันอีกครั้ง";
        else if(newNotification["notificationType"] === "donateConfirmation"){
            newNotification["text"] = "ท่านได้ทำการบริจาคเงินให้กับโครงการ "+newNotification["projectName"]+" เป็นจำนวนเงิน "+newNotification["amount"]+" บาท";
            delete newNotification["projectName"];
            delete newNotification["amount"];
        }
        try {
            const newNotificationCreated = new this.notificationModel(newNotification);
            const result = await newNotificationCreated.save();
            return {
                "status": "notification creation successful",
                "notificationType": result["notificationType"],
                "owner": result["owner"],
                "text": result["text"],
            };
        }
        catch (err) {
            throw new HttpException({
                "msg": "notification creation failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
