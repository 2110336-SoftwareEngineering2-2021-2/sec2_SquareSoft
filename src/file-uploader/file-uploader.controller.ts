import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploaderService } from './file-uploader.service';
import {
    ApiOperation,
    ApiTags,
    ApiBadRequestResponse,
    ApiParam,
    ApiInternalServerErrorResponse,
    ApiConsumes,
    ApiBody,
    ApiOkResponse
    
} from '@nestjs/swagger';
import FileUploadDto from './file-uploader.dto';


//@UseGuards(AllRoleGuard)
@ApiTags('file-uploader')
@Controller('file-uploader')
export class FileUploaderController {

    constructor(private fileUploaderService: FileUploaderService) {}

    @Post()
    @ApiBadRequestResponse({ description: "Invalid file" })
    @ApiInternalServerErrorResponse({ description: "Defective file storage server" })
    @ApiOperation({ summary: 'An API for uploading file to a desired S3 bucket and return the new name of the file.' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'An uploading file.',
      type: FileUploadDto,
    })
    @ApiOkResponse({ description: "Return file storage server response" })
    async uploadFile(@UploadedFile() file: Express.Multer.File){
        return this.fileUploaderService.uploadFile(file);
    }

    @Get("/:filename")
    @ApiParam({ name: "filename", type: String, description: "The name of a stored file." })
    @ApiOperation({ summary: 'An API for getting presigned URL or ready-to-use URL in a desired S3 bucket of a specific filename.' })
    @ApiOkResponse({ description: "Return the URL string of a file-name."})
    async getPreSignedURL(@Param() {filename}){
        return this.fileUploaderService.getPreSignedURL(filename);
    }
}

