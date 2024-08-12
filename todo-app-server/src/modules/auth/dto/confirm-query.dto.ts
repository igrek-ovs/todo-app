import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class ConfirmQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID("4")
  userId?: string;

  @ApiProperty({
    description: "Confirmation code",
  })
  @IsOptional()
  @IsString()
  code?: string;
}
