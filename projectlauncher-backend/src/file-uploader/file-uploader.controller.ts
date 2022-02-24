import { Body, Controller, Post } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';

@Controller('file-uploader')
export class FileUploaderController {

    constructor(private fileUploaderService: FileUploaderService) {}

    @Post()
    async uploadFile(@Body() file){
        console.log(file);
        return ;
    }
}
