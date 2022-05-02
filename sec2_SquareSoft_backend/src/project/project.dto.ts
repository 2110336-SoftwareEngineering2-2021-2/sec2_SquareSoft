import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL, Max, Min, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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

export class FindProjectDTO{

    @ApiProperty()
    @IsString()
    projectID: string;

    @ApiProperty()
    @IsString()
    projectName: string;

    @ApiProperty()
    @IsString()
    objective: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    fundingType: string;

    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty()
    @IsDateString()
    deadline: string;

    @ApiProperty()
    @IsNumber()
    fundingGoal: number;

    @ApiProperty()
    @IsString()
    projectOwnerID: string;

    @ApiProperty()
    @IsUrl()
    projectPicture: string;
}

export class FindProjectByOwnerDTO {

  
    @ApiProperty({ type: FindProjectDTO })
    @ValidateNested()
    @Type(() => FindProjectDTO)
    doc_list: FindProjectDTO[]
  }
  