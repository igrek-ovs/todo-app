import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { Task } from "../entities";
import { EventTypes } from "../enums";
import { TaskGateway } from "../gateway";

@Injectable()
export class TaskEventListener {
  constructor(private readonly taskGateway: TaskGateway) {}

  @OnEvent(EventTypes.TASK_UPDATED)
  handleTaskUpdated(task: Task): void {
    this.taskGateway.emit(EventTypes.TASK_UPDATED, task);
  }
}