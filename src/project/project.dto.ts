import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

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