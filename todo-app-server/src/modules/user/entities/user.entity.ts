import { ApiProperty } from "@nestjs/swagger";
import { DataTypes, UUIDV4 } from "sequelize";
import { Column, HasMany, Model, Table } from "sequelize-typescript";

import { Task } from "../../task/entities";

@Table({ tableName: "users" })
export class User extends Model<User> {
  @Column({
    defaultValue: UUIDV4,
    primaryKey: true,
    unique: true,
  })
  @ApiProperty()
  declare id: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  @ApiProperty()
  email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  @ApiProperty()
  password: string;

  @Column({
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  @ApiProperty()
  isEmailConfirmed: boolean;

  @HasMany(() => Task)
  tasks: Task[];
}
