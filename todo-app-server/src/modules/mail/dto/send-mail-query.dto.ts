import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsUUID } from "class-validator";

export class SendMailQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID("4")
  userId?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
}