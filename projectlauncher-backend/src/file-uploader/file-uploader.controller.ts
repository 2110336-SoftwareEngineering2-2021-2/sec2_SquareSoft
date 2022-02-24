import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from './file-uploader.service';

@Controller('file-uploader')
export class FileUploaderController {

    constructor(private fileUploaderService: FileUploaderService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.fileUploaderService.uploadFile(file);
    }

    @Get("/:filename")
    async getPreSignedURL(@Param() {filename}){
        return this.fileUploaderService.getPreSignedURL(filename);
    }
}
