import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Role } from "./models/role.models";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepo: typeof Role) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleRepo.create(createRoleDto);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepo.findAll();
  }

  async findByValue(value: string): Promise<Role> {
    return this.roleRepo.findOne({ where: { value } });
  }
  /* async update(value: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.roleRepo.update(updateRoleDto, {
      where: { value },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
