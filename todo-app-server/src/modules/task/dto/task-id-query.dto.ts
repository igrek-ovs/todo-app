import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsUUID } from "class-validator";

export class TaskIdQueryDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID("4")
  taskId?: string;
}