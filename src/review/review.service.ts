import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { review } from './review.model';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('review') private readonly reviewModel: Model<review>
    ) { }


    
    async createReview(text: String, star: Number, userID: String, projectID: String) {

        const newReview = {text, star, userID, projectID}
        try {
            const newReviewCreated = new this.reviewModel(newReview);
            const result = await newReviewCreated.save();
            return newReview;
        }
        catch (err) {
            throw new HttpException({
                "msg": "review creation failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    
    async deleteReview() {
        const results={hello: 'hello'}
        return results;
    }

    async getReview() {
        const results={hello: 'hello'}
        return results;
    }
}
