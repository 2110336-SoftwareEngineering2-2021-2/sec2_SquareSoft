import { Body, Controller, Get, Post ,UseGuards,Query,Req, Delete, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"

@UseGuards(RoleGuard.AllRoleGuard)
@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService ){}
    
    @Delete('/:id')
    async deleteNotification(@Param("id") id,@Req() req: any) {
      
        const queryBlock = {_id:id,owner:req.user._id}
        const results=this.notificationService.deleteNotification(queryBlock);
        
        return results;
    }

    @Get('find-by-owner')
    async findByOwnerId(@Req() req: any) {
        const query= {owner:req.user._id}
        const results=await this.notificationService.findByOwnerID(query);
        return results;
    }


    

    

    

}


