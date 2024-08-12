import { ApiProperty } from "@nestjs/swagger";
import { DataTypes, UUIDV4 } from "sequelize";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../../user/entities";

@Table({ tableName: "hashed_codes" })
export class HashedCode extends Model<HashedCode> {
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
  hashedCode: string;

  @ForeignKey(() => User)
  @Column
  @ApiProperty()
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
