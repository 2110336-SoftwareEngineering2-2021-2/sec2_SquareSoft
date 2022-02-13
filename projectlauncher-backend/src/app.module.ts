import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationSystemModule } from './registration-system/registration-system.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RegistrationSystemModule,
    MongooseModule.forRoot('mongodb+srv://admin:admin@project-launcher-cluste.6tefk.mongodb.net/test'),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
