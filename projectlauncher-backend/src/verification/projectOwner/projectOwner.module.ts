import { Module, forwardRef } from "@nestjs/common"
import { ProjectOwnerVerificationService } from "./projectOwner.service"
import { ProjectOwnerVerificationController } from "./projectOwner.controller"
import { UserProjectOwnerSchema} from "src/registration-system/registration-system.model"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports : [MongooseModule.forFeature([{name: 'userProjectOwner', schema: UserProjectOwnerSchema}])],
  providers: [ProjectOwnerVerificationService],
  controllers: [ProjectOwnerVerificationController],
  exports: [ProjectOwnerVerificationModule],
})
export class ProjectOwnerVerificationModule { }