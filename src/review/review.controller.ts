import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { CreateReviewDTO, CreateReviewReturnDTO, DeleteReviewReturnDTO, GetReviewReturnDTO ,ReportReviewReturnDTO,ReportedReviewReturnDTO} from './review.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger"

@ApiTags("review")
@ApiUnauthorizedResponse({ description: "User is not logged in" })
@Controller('review')
export class ReviewController {
    constructor(private reviewService: ReviewService ){}

    @ApiBearerAuth()
    @ApiBody({ type: CreateReviewDTO })
    @ApiOkResponse({ description: "Return a review", type: CreateReviewReturnDTO })
    @ApiBadRequestResponse({description: "invalid body"})
    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('')
    async createReview(@Req() req: any, @Body() body: CreateReviewDTO) {
        const results = this.reviewService.createReview(body.text, body.star, req.user, body.projectID);
        return results;
    }
    
    @ApiBearerAuth()
    @ApiParam({ name: "id", type: String, description: "A review's ObjectID" })
    @ApiOkResponse({ description: "Return a deleted review", type: DeleteReviewReturnDTO })
    @ApiBadRequestResponse({description: "invalid review id"})
    @UseGuards(RoleGuard.AllRoleGuard)
    @Delete(':id')
    async deleteReview(@Req() req: any, @Param('id') reviewID) {
        const results = this.reviewService.deleteReview(reviewID, req.user._id);
        return results;
    }

    @ApiBearerAuth()
    @ApiQuery({ name: "projectID", type: String, required: true })
    @ApiOkResponse({ description: "Return a list of reviews", type: GetReviewReturnDTO, isArray: true })
    @ApiBadRequestResponse({description: "invalid project id"})
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

    @ApiBearerAuth()
    @ApiBody({ type: ReportReviewReturnDTO })
    @ApiOkResponse({ description: "Return a reported review", type: ReportedReviewReturnDTO })
    @ApiNotFoundResponse({description: "the review is not found"})
    // @UseGuards(RoleGuard.DonPOGuard)
    @Post('report')
    async reportReview(@Body() body) {
        let results = await this.reviewService.reportReview(body.reviewID);

        return results;
    }
}
