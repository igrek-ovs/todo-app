import { Body, Controller, Delete, Get, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { AuthGuard } from "../../auth/guards";
import { GetTasksQueryDto, TaskDto, TaskIdQueryDto } from "../dto";
import { Task } from "../entities";
import { TaskService } from "../services";

@ApiTags("Tasks")
@ApiBearerAuth("JWT-auth")
@Controller("tasks")
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Body() task: TaskDto): Promise<Task> {
    return await this.taskService.create(task);
  }

  @Get()
  async getAllTasks(@Query() query: GetTasksQueryDto): Promise<Task[]> {
    const { userId, filter } = query;
    return await this.taskService.getAll(userId, filter);
  }

  @Get("find_id")
  async getTaskById(@Query() query: TaskIdQueryDto): Promise<Task> {
    const { taskId } = query;
    return await this.taskService.getById(taskId);
  }

  @Put()
  async updateTask(@Query() query: TaskIdQueryDto, @Body() task: TaskDto): Promise<Task> {
    const { taskId } = query;
    return await this.taskService.update(taskId, task);
  }

  @Put("complete_task")
  async completeTask(@Query() query: TaskIdQueryDto): Promise<Task> {
    const { taskId } = query;
    return await this.taskService.completeTask(taskId);
  }

  @Delete()
  async deleteTask(@Query() query: TaskIdQueryDto): Promise<void> {
    const { taskId } = query;
    await this.taskService.delete(taskId);
  }
}
