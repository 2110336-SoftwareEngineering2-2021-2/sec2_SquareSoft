import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectOwnerVerificationModule } from  './verification/projectOwner/projectOwner.module';
import { RegistrationSystemModule } from './registration-system/registration-system.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@project-launcher-cluste.6tefk.mongodb.net/test'),
    ProjectOwnerVerificationModule,
    RegistrationSystemModule,
    AuthModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
