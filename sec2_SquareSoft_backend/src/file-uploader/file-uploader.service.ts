import { Injectable, HttpStatus} from '@nestjs/common';
import { S3 } from "aws-sdk";

@Injectable()
export class FileUploaderService {
    constructor(){}

    async uploadFile(file : Express.Multer.File){
        if (!file){
            throw HttpStatus.BAD_REQUEST;
        }
        const s3 = new S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
        const params = {
            Bucket: process.env.AWS_S3_BUCKET,
            Key: file.originalname,
            Body: file.buffer
        };
        try{
            const response = await s3.upload(params).promise();
            return response
        }
        catch (error){  
            throw HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    async getPreSignedURL(filename : string){
        const s3 = new S3({
            accessKeyId: process.env.AWS_S3_ACCESS_KEY,
            secretAccessKey: process.env.AWS_S3_KEY_SECRET,
        });
        const params = {Bucket: process.env.AWS_S3_BUCKET, Key: filename, Expires: 1800};
        const url = s3.getSignedUrl('getObject', params);
        return url;
    }
}
