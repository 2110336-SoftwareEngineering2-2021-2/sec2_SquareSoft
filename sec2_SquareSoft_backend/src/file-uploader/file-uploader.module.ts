import { Module } from '@nestjs/common';
import { FileUploaderService } from './file-uploader.service';
import { FileUploaderController } from './file-uploader.controller';

@Module({
  providers: [FileUploaderService],
  controllers: [FileUploaderController]
})
export class FileUploaderModule {}
