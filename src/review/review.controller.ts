import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"

@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService ){}

    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('')
    async createReview(@Req() req: any, @Body() body) {
        const results = this.reviewService.createReview(body.text, body.star, req.user._id, body.projectID);
        return results;
    }
    
    @Delete('')
    async deleteReview(@Body() review) {
        const results={hello: 'hello'}
        return results;
    }

    @Get('')
    async getReview(@Body() review) {
        const results={hello: 'hello'}
        return results;
    }
}
