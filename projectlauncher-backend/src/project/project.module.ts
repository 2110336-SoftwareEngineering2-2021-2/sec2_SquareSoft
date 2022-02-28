import { Module ,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectController } from './project.controller';
import { ProjectSchema } from './project.model';
import { ProjectService } from './project.service';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'project', schema: ProjectSchema}
    ]),
    forwardRef(() => AuthModule),
    RegistrationSystemModule,
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService]
})
export class ProjectModule {}
