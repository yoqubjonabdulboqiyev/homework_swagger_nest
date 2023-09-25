import { ApiProperty } from "@nestjs/swagger";

import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { User } from "src/users/models/user.model";
import { UserRole } from "./user-roles.model";

interface RoleAttr {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "USER", description: "ROL nomi unikal" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  value: string;

  @ApiProperty({ example: "Bu user roli", description: "ROL haqida malumot" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ApiProperty({ example: ["USER"], description: "Userlar" })
  @BelongsToMany(() => User, () => UserRole)
  users: User[];
}
