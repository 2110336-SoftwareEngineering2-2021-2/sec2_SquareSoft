import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsDate, IsEmail, IsNumber, ValidateNested, IsString, IsBoolean, IsNotEmpty, IsOptional } from "class-validator"
import { Type } from "class-transformer"
export class ProjectOwnerDTO {

  @ApiProperty()
  @IsString()
  username: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  firstname: string

  @ApiProperty()
  @IsString()
  lastname: string


  @ApiProperty()
  @IsString()
  verification_status: string

  @ApiProperty()
  @IsNumber()
  balance: number

}

export class SetStatusDTO {
  @ApiProperty()
  @IsString()
  id: String
}

export class ProjectOwnerVerificationSearchResultDTO {
  @ApiProperty()
  @IsNumber()
  doc_count: Number

  @ApiProperty({ type: ProjectOwnerDTO })
  @ValidateNested()
  @Type(() => ProjectOwnerDTO)
  doc_list: ProjectOwnerDTO[]
}