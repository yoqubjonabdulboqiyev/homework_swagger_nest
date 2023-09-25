import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoleModule } from "./role/role.module";
import { Role } from "./role/models/role.models";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { UserRole } from "./role/models/user-roles.model";
import { AuthModule } from './auth/auth.module';
const { env } = process;
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: env.db_host,
      port: Number(env.db_port),
      username: env.db_user,
      password: String(env.db_password),
      database: env.db_dbname,
      models: [Role, User, UserRole],
      autoLoadModels: true,
      logging: false,
    }),
    RoleModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
