import { ApiProperty } from "@nestjs/swagger";

import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/models/user.model";
import { Role } from "./role.models";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRole extends Model<UserRole> {
  @ApiProperty({ example: "3", description: " unikal ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "2", description: "mavjud bolgan ID si" })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ApiProperty({ example: "2", description: "mavjud bolgan rol ID si" })
  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
