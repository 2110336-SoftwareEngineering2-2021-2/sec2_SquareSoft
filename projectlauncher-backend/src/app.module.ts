import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectOwnerVerificationModule } from  './verification/projectOwner/projectOwner.module';
import { RegistrationSystemModule } from './registration-system/registration-system.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@project-launcher-cluste.6tefk.mongodb.net/test'),
    ProjectOwnerVerificationModule,
    RegistrationSystemModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
