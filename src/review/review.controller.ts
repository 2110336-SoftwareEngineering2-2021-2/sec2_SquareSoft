import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import * as RoleGuard from "src/auth/jwt-auth.guard"
import { CreateReviewDTO, CreateReviewReturnDTO, DeleteReviewReturnDTO, GetReviewReturnDTO ,ReportReviewReturnDTO,ReportedReviewReturnDTO} from './review.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiNotFoundResponse
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
    @ApiOperation({ summary: 'An API for creating review for a project by a donator of the project.' })
    @UseGuards(RoleGuard.AllRoleGuard)
    @Post('')
    async createReview(@Req() req: any, @Body() body: CreateReviewDTO) {
        const results = this.reviewService.createReview(body.text, body.star, req.user, body.projectID);
        return results;
    }
    
    @ApiBearerAuth()
    @ApiParam({ name: "id", type: String, description: "A review's ObjectID" })
    @ApiOkResponse({ description: "Return a deleted review", type: DeleteReviewReturnDTO })
    @ApiOperation({ summary: 'An API for deleting review for a review by a reviewer.' })
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
    @ApiOperation({ summary: 'An API for getting a review for a project and donator indentifying for a user.' })
    @UseGuards(RoleGuard.GuestAndAllRoleGuard)
    @Get('')
    async getReviewByProjectID(@Req() req: any, @Query() query) {
        let results;
        if (!req.user) {
            results = this.reviewService.getReviewByProjectID(query.projectID, null);
        } else {
            results = this.reviewService.getReviewByProjectID(query.projectID, req.user._id);
        }
        return results;
    }

    @ApiBearerAuth()
    @ApiBody({ type: ReportReviewReturnDTO })
    @ApiOkResponse({ description: "Return a reported review", type: ReportedReviewReturnDTO })
    @ApiNotFoundResponse({description: "the review is not found"})
    @UseGuards(RoleGuard.DonPOGuard)
    @Post('report')
    async reportReview(@Body() body) {
        let results = await this.reviewService.reportReview(body.reviewID);

        return results;
    }


    @ApiBearerAuth()
    @ApiQuery({ name: "reportID", type: String, required: true })
    @ApiOkResponse({ description: "Return a response status for successed deleting.", type: GetReviewReturnDTO, isArray: true })
    @ApiBadRequestResponse({description: "invalid report id"})
    @ApiOperation({ summary: 'An API for deleting a reported review for a project by admin.' })
    @UseGuards(RoleGuard.AdminGuard)
    @Delete('admin/reported')
    async deleteReportedReview(@Query() query) {
        const results=this.reviewService.deleteReportedReview(query['reportID']);
        return results;
    }

    @ApiBearerAuth()
    @ApiQuery({ name: "reportID", type: String, required: true })
    @ApiOkResponse({ description: "Return a response status for successed passing.", type: GetReviewReturnDTO, isArray: true })
    @ApiBadRequestResponse({description: "invalid report id"})
    @ApiOperation({ summary: 'An API for passing a reported review for a project by admin.' })
    @UseGuards(RoleGuard.AdminGuard)
    @Post('admin/reported')
    async passReportedReview(@Query() query) {
        const results=this.reviewService.passReportedReview(query['reportID']);

        return  results;
    }

    @ApiBearerAuth()
    @ApiOkResponse({ description: "Return a list of reported reviews for successed passing.", type: GetReviewReturnDTO, isArray: true })
    @ApiOperation({ summary: 'An API for getting a list of reported reviews by admin.' })
    @UseGuards(RoleGuard.AdminGuard)
    @Get('admin/reported')
    async getReportedReview() {
        const results=this.reviewService.getReportedReview();
        return results;
    }
}
