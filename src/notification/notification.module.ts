import { Module ,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { NotificationController } from './notification.controller';
import { NotificationSchema } from './notification.model';
import { NotificationService } from './notification.service';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'notification', schema: NotificationSchema}
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => RegistrationSystemModule),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule {}
