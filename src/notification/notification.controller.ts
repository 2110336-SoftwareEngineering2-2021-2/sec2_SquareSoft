import { Body, Controller, Get, Post ,UseGuards,Query,Req, Delete, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { NotificationDTO ,NotificationSearchResultDTO} from "./notification.dto"

import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from "@nestjs/swagger"

@ApiTags("notification")
@ApiUnauthorizedResponse({ description: "User is not logged in" })
@ApiBearerAuth()
@UseGuards(RoleGuard.AllRoleGuard)
@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService ){}
    
    @ApiParam({ name: "id", type: String, description: "A notification's ObjectID" })
    @ApiOkResponse({ description: "Return a notification that was deleted",type:NotificationDTO})
    @Delete('/:id')
    async deleteNotification(@Param("id") id,@Req() req: any) {
      
        const queryBlock = {_id:id,owner:req.user._id}
        const results=this.notificationService.deleteNotification(queryBlock);
        
        return results;
    }

    @ApiOkResponse({ description: "Return list of notifications that owner = req.user._id",type:NotificationSearchResultDTO})
    @Get('find-by-owner')
    async findByOwnerId(@Req() req: any) {
        const query= {owner:req.user._id}
        const results=await this.notificationService.findByOwnerID(query);
        return results;
    }


    

    

    

}


