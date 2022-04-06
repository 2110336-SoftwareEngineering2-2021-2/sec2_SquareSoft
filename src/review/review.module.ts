import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'review', schema: ReviewSchema }]), 
        forwardRef(() => AuthModule),
        RegistrationSystemModule
    ],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}
