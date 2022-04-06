import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL, Max, Min, ValidateNested } from "class-validator";

export class CreateReviewDTO {
    @IsNotEmpty()
    @IsString()
    text: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(5)
    star: number;

    @IsNotEmpty()
    projectID: string;
}
  