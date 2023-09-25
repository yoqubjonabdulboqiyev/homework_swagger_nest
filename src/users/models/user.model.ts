import { ApiProperty } from "@nestjs/swagger";
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "src/role/models/role.models";
import { UserRole } from "src/role/models/user-roles.model";

interface UserAttr {
  name: string;
  email: string;
  password: string;
}
@Table({ tableName: "users" })
export class User extends Model<User, UserAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: "user1", description: "User nomi" })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: "user1@mail.ru", description: "User emaili unikal" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @ApiProperty({ example: "UZB3K!S", description: "User paroli" })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: "true", description: "User faolligi" })
  @Column({ type: DataType.STRING, defaultValue: true })
  is_active: boolean;

  @ApiProperty({ example: ["Roles"], description: "User rollari" })
  @BelongsToMany(() => Role, () => UserRole)
  roles: Role[];
}
