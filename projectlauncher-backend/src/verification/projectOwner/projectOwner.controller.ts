import { Controller, Get, Param, Patch, Body, Query, UseGuards } from "@nestjs/common"
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { ProjectOwnerVerificationService } from "./projectOwner.service"
//
@UseGuards(RoleGuard.AdminGuard)
@Controller("projectOwner")
export class ProjectOwnerVerificationController {
  constructor(private readonly projectOwnerService: ProjectOwnerVerificationService) { }

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
  projectOwnerReject(@Body("id") id: string) {
    return this.projectOwnerService.setVerificationStatus(id, false)
  }

}