import { IsOptional, IsUUID } from "class-validator";

import { TaskDto } from "./task.dto";

export class GatewayBodyDto {
  @IsOptional()
  @IsUUID("4")
  userId?: string;

  @IsOptional()
  @IsUUID("4")
  taskId?: string;

  @IsOptional()
  taskDto?: TaskDto;
}
