import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectOwnerVerificationModule } from  './verification/projectOwner/projectOwner.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@project-launcher-cluste.6tefk.mongodb.net/test'),
    ProjectOwnerVerificationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
