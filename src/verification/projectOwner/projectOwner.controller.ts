import { Controller, Get, Param, Patch, Body, Query, UseGuards, Req } from "@nestjs/common"
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { ProjectOwnerVerificationService } from "./projectOwner.service"
import { NotificationService } from "../../notification/notification.service"
import { EmailService } from "../../email/email.service"

@UseGuards(RoleGuard.AdminGuard)
@Controller("projectOwner")
export class ProjectOwnerVerificationController {
  constructor(private readonly projectOwnerService: ProjectOwnerVerificationService,
              private readonly notificationService: NotificationService,
              private readonly emailService: EmailService,
              ) { }

  @Get()
  getSearchResult(@Query() query) {
    return this.projectOwnerService.getVerificationList(query.start, query.end)
  }

  @Get("/:id")
  getPersonalData(@Param("id") id: string) {
    return this.projectOwnerService.getProjectOwnerById(id)
  }

  @Patch("/approve")
  projectOwnerApprove(@Body("id") id: string) {
    return this.projectOwnerService.setVerificationStatus(id, true)
  }

  @Patch("/reject")
  async projectOwnerReject(@Body("id") id: string) {
    const result= await this.projectOwnerService.setVerificationStatus(id, false)
    this.notificationService.createNotification({notificationType:"rejectedVerification",owner:id})
    this.emailService.sendRejectedVerificationNotification(id);
    return result
  }

}