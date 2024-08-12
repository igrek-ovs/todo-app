import { ApiProperty } from "@nestjs/swagger";
import { UUIDV4 } from "sequelize";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../../user/entities";
import { TaskFrequency, TaskType } from "../enums";

@Table({ tableName: "tasks" })
export class Task extends Model<Task> {
  @Column({
    defaultValue: UUIDV4,
    primaryKey: true,
    unique: true,
  })
  @ApiProperty()
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty()
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty()
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  @ApiProperty()
  dueDate: Date;

  @Column({
    type: DataType.ENUM,
    values: [TaskType.OneTime, TaskType.Recurring, TaskType.Accumulating],
    allowNull: false,
  })
  @ApiProperty()
  taskType: string;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  @ApiProperty()
  accumulativeProgress?: number;

  @Column({
    type: DataType.NUMBER,
    allowNull: true,
  })
  @ApiProperty()
  accumulativeGoal?: number;

  @Column({
    type: DataType.ENUM,
    values: [TaskFrequency.Daily, TaskFrequency.Monthly, TaskFrequency.Yearly],
    allowNull: true,
  })
  @ApiProperty()
  frequency?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  @ApiProperty()
  isCompleted: boolean;

  @ForeignKey(() => User)
  @Column
  @ApiProperty()
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
