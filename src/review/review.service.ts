import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { project } from 'src/project/project.model';
import { review } from './review.model';

@Injectable()
export class ReviewService {
    constructor(
        @InjectModel('review') private readonly reviewModel: Model<review>,
        @InjectModel('project') private readonly projectModel: Model<project>
    ) { }

    async createReview(text: String, star: Number, userID: String, projectID: String) {

        let projectObject;

        try {
            projectObject = await this.projectModel.findOne({ _id: projectID})
        } catch (err) {
            throw new HttpException({ "msg": "project not found" }, HttpStatus.BAD_REQUEST)
        }
        
        if (!projectObject) {
            throw new HttpException({ "msg": "project not found" }, HttpStatus.BAD_REQUEST)
        }

        const existingReview = await this.reviewModel.findOne({ projectID: projectID, userID: userID})

        if (existingReview) {
            throw new HttpException({ "msg": "the user has already reviewed the project" }, HttpStatus.BAD_REQUEST)
        }

        const newReview = {text, star, userID, projectID}
        try {
            const newReviewCreated = new this.reviewModel(newReview);
            const result = await newReviewCreated.save();
            return result;
        }
        catch (err) {
            throw new HttpException({
                "msg": "review creation failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    
    async deleteReview(reviewID: String, userID: String) {

        const reviewObject = await this.reviewModel.findOne({ _id: reviewID, userID: userID});

        if (!reviewObject) {
            throw new HttpException({ "msg": "this review does not belong to this user or this review does not exist" }, HttpStatus.BAD_REQUEST)
        }

        try {
            const result = await reviewObject.remove()
            return result
        } catch (err) {
            throw new HttpException({
                "msg": "review deletion failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getReview(projectID: String) {
        try {
            const result = await this.reviewModel.find({ projectID: projectID });
            return result;
        } catch (err) {
            throw new HttpException({
                "msg": "review deletion failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}
