import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistrationSystemModule } from './registration-system/registration-system.module';

@Module({
  imports: [RegistrationSystemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
