import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL, Max, Min, ValidateNested } from "class-validator";

export class CreateReviewDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    text: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    @ApiProperty()
    star: number;

    @IsNotEmpty()
    @ApiProperty()
    projectID: string;
}

export class CreateReviewReturnDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    projectID: string;

    @ApiProperty()
    star: number;

    @ApiProperty()
    text: string;
}

export class DeleteReviewReturnDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    projectID: string;

    @ApiProperty()
    star: number;

    @ApiProperty()
    text: string;
}
  
export class GetReviewReturnDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    userID: string;

    @ApiProperty()
    projectID: string;

    @ApiProperty()
    star: number;

    @ApiProperty()
    text: string;

    @ApiProperty()
    isOwner: boolean;
}

export class ReportReviewReturnDTO {
    @ApiProperty()
    reviewID: string;

}

export class ReportedReviewReturnDTO {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    reviewID: string;


    @ApiProperty()
    datetime: Date;

    @ApiProperty()
    status: string;


}