import { Module } from "@nestjs/common"
import { ProjectOwnerVerificationService } from "./projectOwner.service"
import { ProjectOwnerVerificationController } from "./projectOwner.controller"
import { UserProjectOwnerSchema } from "src/registration-system/registration-system.model"
import { MongooseModule } from "@nestjs/mongoose"
import { RegistrationSystemModule } from "src/registration-system/registration-system.module"
import { NotificationModule } from "src/notification/notification.module"
import { EmailModule } from "src/email/email.module"

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'userProjectOwner', schema: UserProjectOwnerSchema }]),
    RegistrationSystemModule,
    NotificationModule,
    EmailModule
  ],
  providers: [ProjectOwnerVerificationService],
  controllers: [ProjectOwnerVerificationController],
  exports: [ProjectOwnerVerificationModule],
})
export class ProjectOwnerVerificationModule { }