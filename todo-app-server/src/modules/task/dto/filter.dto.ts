import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FilterDto {
  @ApiProperty({ name: "filter[name]" })
  @IsOptional()
  @IsString()
  name?: string;
}