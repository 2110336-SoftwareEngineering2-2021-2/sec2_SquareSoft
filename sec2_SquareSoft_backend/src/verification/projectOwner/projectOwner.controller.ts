import { Controller, Get, Param, Patch, Body, Query, UseGuards, Req } from "@nestjs/common"
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { ProjectOwnerVerificationService } from "./projectOwner.service"
import { NotificationService } from "../../notification/notification.service"
import { EmailService } from "../../email/email.service"
import { ProjectOwnerDTO, ProjectOwnerVerificationSearchResultDTO, SetStatusDTO } from "./projectOwner.dto"
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse
} from "@nestjs/swagger"

@ApiTags("projectOwner")
@ApiUnauthorizedResponse({ description: "User is not logged in" })
@ApiForbiddenResponse({ description: "Must be admin to use this endpoints" })
@ApiBearerAuth()
@UseGuards(RoleGuard.AdminGuard)
@Controller("projectOwner")
export class ProjectOwnerVerificationController {
  constructor(private readonly projectOwnerService: ProjectOwnerVerificationService,
              private readonly notificationService: NotificationService,
              private readonly emailService: EmailService,
              ) { }

  @ApiQuery({ name: "start", type: Number, required: false })
  @ApiQuery({ name: "end", type: Number, required: false })
  @ApiOkResponse({ description: "Return list of projectOwner that verification_status is submitted",type:ProjectOwnerVerificationSearchResultDTO})
  @Get()
  getSearchResult(@Query() query) {
    return this.projectOwnerService.getVerificationList(query.start, query.end)
  }

  @ApiParam({ name: "id", type: String, description: "A projectOwner's ObjectID" })
  @ApiOkResponse({ description: "Return a user projectOwner id in param",type:ProjectOwnerDTO})
  @Get("/:id")
  getPersonalData(@Param("id") id: string) {
    return this.projectOwnerService.getProjectOwnerById(id)
  }

  @ApiBody({ type: SetStatusDTO })
  @ApiOkResponse({ description: "Approve verification and return projectOwner", type: ProjectOwnerDTO })
  @ApiNotFoundResponse({ description: "User not found" })
  @Patch("/approve")
  projectOwnerApprove(@Body("id") id: string) {
    return this.projectOwnerService.setVerificationStatus(id, true)
  }

  @ApiBody({ type: SetStatusDTO })
  @ApiOkResponse({ description: "Approve verification and return projectOwner", type: ProjectOwnerDTO })
  @ApiNotFoundResponse({ description: "User not found" })
  @Patch("/reject")
  async projectOwnerReject(@Body("id") id: string) {
    const result= await this.projectOwnerService.setVerificationStatus(id, false)
    this.notificationService.createNotification({notificationType:"rejectedVerification",owner:id})
    this.emailService.sendRejectedVerificationNotification(id);
    return result
  }

}