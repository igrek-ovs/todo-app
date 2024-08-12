import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import { FilterDto, TaskDto } from "../dto";
import { Task } from "../entities";
import { EventTypes } from "../enums";

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private tasks: typeof Task,
    private readonly sequelize: Sequelize,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(task: TaskDto): Promise<Task> {
    return await this.tasks.create(task);
  }

  async getById(id: string): Promise<Task> {
    return await this.tasks.findByPk(id);
  }

  async getAll(userId: string, filter: FilterDto): Promise<Task[]> {
    let filters;
    if (filter) {
      filters = this.buildFilters(filter);
    }
    return await this.tasks.findAll({
      where: {
        userId,
        ...filters,
      },
    });
  }

  async update(id: string, newTask: TaskDto): Promise<Task> {
    const result = await this.sequelize.transaction(async (transaction) => {
      const task = await this.tasks.findByPk(id, { transaction });

      return await task.update(newTask, { transaction });
    });

    this.eventEmitter.emit(EventTypes.TASK_UPDATED, result);

    return result;
  }

  async delete(id: string): Promise<void> {
    await this.tasks.destroy({ where: { id } });
  }

  private buildFilters(filters: FilterDto) {
    const where: WhereOptions<Task> = {};

    if (filters.name) {
      where.name = {
        [Op.like]: `%${filters.name}%`,
      };
    }

    return where;
  }

  async updateProgress(id: string, amount: number): Promise<Task> {
    return await this.sequelize.transaction(async (transaction) => {
      const task = await this.tasks.findByPk(id, { transaction });

      task.accumulativeProgress += amount;

      if (task.accumulativeProgress >= task.accumulativeGoal) {
        task.isCompleted = true;
      }

      await task.save({ transaction });

      this.eventEmitter.emit(EventTypes.TASK_UPDATED, task);

      return task;
    });
  }

  async completeTask(id: string): Promise<Task> {
    return await this.sequelize.transaction(async (transaction) => {
      const task = await this.tasks.findByPk(id, { transaction });

      task.dataValues.isCompleted = true;

      await task.save({ transaction });

      this.eventEmitter.emit(EventTypes.TASK_UPDATED, task);

      return task;
    });
  }
}
