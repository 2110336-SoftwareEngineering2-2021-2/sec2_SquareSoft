import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectOwnerVerificationModule } from  './verification/projectOwner/projectOwner.module';
import { RegistrationSystemModule } from './registration-system/registration-system.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { ProjectModule } from './project/project.module';

import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { ConfigModule } from '@nestjs/config';

import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://admin:admin@project-launcher-cluste.6tefk.mongodb.net/test'),
    ProjectOwnerVerificationModule,
    RegistrationSystemModule,
    AuthModule,
    TransactionModule,
    ProjectModule,
    FileUploaderModule,
    EmailModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
