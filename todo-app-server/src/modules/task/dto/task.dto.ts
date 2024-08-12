import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEnum, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

import { TaskFrequency, TaskType } from "../enums";

export class TaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
  })
  @IsDateString()
  dueDate: Date;

  @ApiProperty({
    enum: TaskType,
  })
  @IsEnum(TaskType)
  taskType: TaskType;

  @ApiProperty()
  @IsUUID("4")
  userId: string;

  @ApiProperty({
    description: "Accumulating progress for ACCUMULATING task",
  })
  @IsOptional()
  @IsNumber()
  accumulativeProgress?: number;

  @ApiProperty({
    description: "Accumulating goal for ACCUMULATING task",
  })
  @IsOptional()
  @IsNumber()
  accumulativeGoal?: number;

  @ApiProperty({
    enum: TaskFrequency,
    description: "Frequency for RECCURING task",
  })
  @IsOptional()
  @IsEnum(TaskFrequency)
  frequency?: TaskFrequency;

  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;
}
