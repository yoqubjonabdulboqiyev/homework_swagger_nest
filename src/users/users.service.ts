import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { RoleService } from "src/role/role.service";
import { AddRoleDto } from "./dto/add-role-dto";
import { ActivateUserDto } from "./dto/activate-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private UserRepo: typeof User,
    private readonly roleService: RoleService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.UserRepo.create(createUserDto);
    const role = await this.roleService.findByValue("ADMIN");

    if (!role) {
      throw new BadRequestException("Role not found");
    }
    await newUser.$set("roles", [role.id]);
    await newUser.save();
    newUser.roles = [role];
    return newUser;
  }

  findAll(): Promise<User[]> {
    return this.UserRepo.findAll({ include: { all: true } });
  }

  async findUserByEmail(email: string) {
    const user = await this.UserRepo.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }
  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.UserRepo.findByPk(addRoleDto.userID);
    const role = await this.roleService.findByValue(addRoleDto.value);
    if (role && user) {
      await user.$add("roles", role.id);
      const updated = await this.UserRepo.findByPk(addRoleDto.userID, {
        include: { all: true },
      });
      return updated;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }
  async removeRole(addRoleDto: AddRoleDto) {
    const user = await this.UserRepo.findByPk(addRoleDto.userID);
    const role = await this.roleService.findByValue(addRoleDto.value);
    if (role && user) {
      await user.$remove("roles", role.id);
      const updated = await this.UserRepo.findByPk(addRoleDto.userID, {
        include: { all: true },
      });
      return updated;
    }
    throw new HttpException("User or role not found", HttpStatus.NOT_FOUND);
  }
  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.UserRepo.findByPk(activateUserDto.userID);
    if (!user) throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    user.is_active = true;
    await user.save();
    return user;
  }
  /* update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
