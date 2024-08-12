import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional } from "class-validator";

export class UserEmailQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;
}
