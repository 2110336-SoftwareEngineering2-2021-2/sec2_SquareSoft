import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AllRoleGuard } from 'src/auth/jwt-auth.guard';
import { FileUploaderService } from './file-uploader.service';
import {
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

//@UseGuards(AllRoleGuard)
@ApiTags('file-uploader')
@Controller('file-uploader')
export class FileUploaderController {

    constructor(private fileUploaderService: FileUploaderService) {}

    @Post()
    @ApiOperation({ summary: 'A API for uploading file to a desired S3 bucket.' })
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.fileUploaderService.uploadFile(file);
    }

    @Get("/:filename")
    @ApiOperation({ summary: 'A API for getting presigned URL or ready-to-use URL in a desired S3 bucket of a specific filename.' })
    async getPreSignedURL(@Param() {filename}){
        return this.fileUploaderService.getPreSignedURL(filename);
    }
}
