import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {

    constructor(private emailService: EmailService) {}

    @Post()
    async sendEmail(){
        return this.emailService.sendRejectedVerificationNotification({});
    }
}
