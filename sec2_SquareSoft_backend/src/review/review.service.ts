import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { project } from 'src/project/project.model';
import { TransactionService } from 'src/transaction/transaction.service';
import { review,reportedReview } from './review.model';

@Injectable()
export class ReviewService {
   
    
    
    constructor(
        @InjectModel('review') private readonly reviewModel: Model<review>,
        @InjectModel('reportedReview') private readonly reportedReviewModel: Model<reportedReview>,
        @InjectModel('project') private readonly projectModel: Model<project>,
        private transactionService: TransactionService
    ) { }
    async getReportedReview() {
        return this.reportedReviewModel.find({status: "unreviewed"});
        // return this.reportedReviewModel.find({status: "deleted"});
        // return this.reportedReviewModel.find();
    }
    async deleteReviewByAdmin(reviewID: string) {
        const reviewObject = await this.reviewModel.findOne({ _id: reviewID});

        if (!reviewObject) {
            throw new HttpException({ "msg": "review not found" }, HttpStatus.BAD_REQUEST)
        }

        try {
            const result = await reviewObject.remove()
            const projectID = reviewObject.projectID
            const projectObject = await this.projectModel.findOne({ _id: projectID})

            const avgStar = await this.reviewModel.aggregate([
                    {$match: {projectID: projectID}},
                    {$group: {_id: "$projectID", avgStar: { $avg: "$star" }}}
            ])

            const updatedAvgStar = (avgStar.length === 0)? 0: avgStar[0].avgStar

            await projectObject.updateOne({avgStar: updatedAvgStar})

            return result
        } catch (err) {
            throw new HttpException({
                "msg": "review deletion failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
    async deleteReportedReview(reportID: string) {
        
        const result=await this.reportedReviewModel.findOne({_id:reportID});
        if(!result) throw new HttpException({"msg": "report not found"}, HttpStatus.FORBIDDEN);
        const result2= await this.deleteReviewByAdmin(result['reviewID']);
        if(!result2) return result2;
        const result3=await result.updateOne({status: "deleted"});
        if(!result3) throw new HttpException({"msg": "cannot update review deletion on report"
    }, HttpStatus.FORBIDDEN); 
        return {review: result2,report: await this.reportedReviewModel.findOne({_id:reportID}) };


    }
    async passReportedReview(reportID: string) {
        const result=await this.reportedReviewModel.findOne({_id:reportID});
        if(!result) throw new HttpException({"msg": "report not found"
    }, HttpStatus.FORBIDDEN);        
        const result2=await result.updateOne({status:"passed"})
        if(!result2) throw new HttpException({"msg": "cannot pass report"
    }, HttpStatus.FORBIDDEN); 
        return await this.reportedReviewModel.findOne({_id:reportID});
    }

    async createReview(text: String, star: Number, user: any, projectID: String) {

        const donated = await this.transactionService.checkDonatorForAProject(user, projectID)
        if (!donated) throw new HttpException({ "msg": "the user has not donated this project" }, HttpStatus.BAD_REQUEST)

        let projectObject;

        try {
            projectObject = await this.projectModel.findOne({ _id: projectID})
        } catch (err) {
            throw new HttpException({ "msg": "project not found" }, HttpStatus.BAD_REQUEST)
        }
        
        if (!projectObject) {
            throw new HttpException({ "msg": "project not found" }, HttpStatus.BAD_REQUEST)
        }

        const existingReview = await this.reviewModel.findOne({ projectID: projectID, userID: user._id})

        if (existingReview) {
            throw new HttpException({ "msg": "the user has already reviewed the project" }, HttpStatus.BAD_REQUEST)
        }

        const newReview = {text, star, userID: user._id, projectID}
        try {
            const newReviewCreated = new this.reviewModel(newReview);
            const result = await newReviewCreated.save();


            const avgStar = await this.reviewModel.aggregate([
                    {$match: {projectID: projectID}},
                    {$group: {_id: "$projectID", avgStar: { $avg: "$star" }}}
            ])

            const updatedAvgStar = (avgStar.length === 0)? 0: avgStar[0].avgStar

            await projectObject.updateOne({avgStar: updatedAvgStar})

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
            const projectID = reviewObject.projectID
            const projectObject = await this.projectModel.findOne({ _id: projectID})

            const avgStar = await this.reviewModel.aggregate([
                    {$match: {projectID: projectID}},
                    {$group: {_id: "$projectID", avgStar: { $avg: "$star" }}}
            ])

            const updatedAvgStar = (avgStar.length === 0)? 0: avgStar[0].avgStar

            await projectObject.updateOne({avgStar: updatedAvgStar})

            return result
        } catch (err) {
            throw new HttpException({
                "msg": "review deletion failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getReviewByProjectID(projectID: String, userID: String) {
        try {
            const reviewList = await this.reviewModel.find({ projectID: projectID });
            const result = reviewList.map(e => {
                return {
                    _id: e._id,
                    userID: e.userID,
                    projectID: e.projectID,
                    text: e.text,
                    star: e.star,
                    isOwner: (e.userID === userID)
                }
            })
            return result;
        } catch (err) {
            throw new HttpException({
                "msg": "review deletion failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async reportReview(reviewID: String) {
        try {
            const review = await this.reviewModel.findById(reviewID);
            if(!review)
            {
                throw new HttpException({
                    "msg": "the review is not found",
                }, HttpStatus.NOT_FOUND);
            }
            const newReportedReview = {reviewID, "datetime":new Date(), status:"unreviewed"}

            const newReportedReviewCreated = new this.reportedReviewModel(newReportedReview);
            const result = await newReportedReviewCreated.save();
            return result;
        } catch (err) {
            throw new HttpException({
                "msg": "review report failed: database error",
                "err": err
            }, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getReviewByReviewID(reviewID: string){
        const results = await this.reviewModel.findOne({_id: reviewID});
        if (!results) {
            throw new HttpException({ "msg": "this review does not exist" }, HttpStatus.BAD_REQUEST)
        }
        return results;

    }
    

}