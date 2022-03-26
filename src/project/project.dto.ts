import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL, Max, Min, ValidateNested } from "class-validator";

export class GetProjectDTO{
    @IsNotEmpty()
    @IsString()
    projectID: string;
}

export class UpdateProjectDTO extends GetProjectDTO{
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(100)
    progress: number;
}

export class EditProjectField{
    @IsOptional()
    @IsString()
    projectName: string;

    @IsOptional()
    @IsString()
    objective: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    fundingType: string;

    @IsOptional()
    @IsString()
    category: string;
    
    @IsOptional()
    @IsDateString()
    deadline: string;

    @IsOptional()
    @IsNumber()
    @Min(0.01)
    fundingGoal: number;

    @IsOptional()
    @IsString()
    projectOwnerID: string;

    @IsOptional()
    @IsUrl()
    projectPicture: string;
}

export class EditProjectDTO extends GetProjectDTO{
    @IsNotEmpty()
    @Type(() => EditProjectField)
    @ValidateNested()
    fields: EditProjectField;
}
  