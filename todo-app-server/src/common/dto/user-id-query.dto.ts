import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class UserIdQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID("4")
  userId?: string;
}