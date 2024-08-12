import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class RefreshQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  refreshToken?: string;
}