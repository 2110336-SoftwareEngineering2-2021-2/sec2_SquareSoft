import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationSystemModule } from './registration-system/registration-system.module';

@Module({
  imports: [RegistrationSystemModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/test1')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
