import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectSchema } from 'src/project/project.model';
import { ProjectModule } from 'src/project/project.module';
import { RegistrationSystemModule } from 'src/registration-system/registration-system.module';
import { TransactionSchema } from 'src/transaction/transaction.model';
import { TransactionModule } from 'src/transaction/transaction.module';
import { ReviewController } from './review.controller';
import { ReviewSchema } from './review.model';
import { ReviewService } from './review.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'review', schema: ReviewSchema }, 
            { name: 'project', schema: ProjectSchema },
        ]), 
        forwardRef(() => AuthModule),
        RegistrationSystemModule,
        TransactionModule
    ],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}
