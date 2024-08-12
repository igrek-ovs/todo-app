import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsUUID } from "class-validator";

import { FilterDto } from "./filter.dto";

export class GetTasksQueryDto {
  @ApiProperty()
  @IsUUID("4")
  userId: string;

  @ApiProperty({ type: FilterDto })
  @IsOptional()
  @Type(() => FilterDto)
  filter?: FilterDto;
}