import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsUUID, Min } from "class-validator";

export class CheckoutSessionQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID("4")
  taskId?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  amount?: number;
}
