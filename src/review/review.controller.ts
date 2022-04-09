import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { CreateReviewDTO } from './review.dto';

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService ){}

    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('')
    async createReview(@Req() req: any, @Body() body: CreateReviewDTO) {
        const results = this.reviewService.createReview(body.text, body.star, req.user, body.projectID);
        return results;
    }
    
    @UseGuards(RoleGuard.AllRoleGuard)
    @Delete(':id')
    async deleteReview(@Req() req: any, @Param('id') reviewID) {
        const results = this.reviewService.deleteReview(reviewID, req.user._id);
        return results;
    }

    @UseGuards(RoleGuard.GuestAndAllRoleGuard)
    @Get('')
    async getReview(@Req() req: any, @Query() query) {
        let results;
        if (!req.user) {
            results = this.reviewService.getReview(query.projectID, null);
        } else {
            results = this.reviewService.getReview(query.projectID, req.user._id);
        }
        return results;
    }
}
