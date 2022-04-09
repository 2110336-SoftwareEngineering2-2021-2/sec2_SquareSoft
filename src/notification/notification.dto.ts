import { Type } from "class-transformer";
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, isURL, Max, Min, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class NotificationDTO{

    @ApiProperty()
    @IsString()
    notificationID: string;

    @ApiProperty()
    @IsString()
    notificationType: string

    @ApiProperty()
    @IsString()
    owner: string

    @ApiProperty()
    @IsString()
    text: string
}
export class NotificationSearchResultDTO {
  
    @ApiProperty({ type: NotificationDTO })
    @ValidateNested()
    @Type(() => NotificationDTO)
    doc_list: NotificationDTO[]
  }