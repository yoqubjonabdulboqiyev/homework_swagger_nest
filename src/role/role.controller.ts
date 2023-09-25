import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Rollar")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiOperation({ summary: "Role yaratish" })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }
  @ApiOperation({ summary: "Rollar korish" })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
  @ApiOperation({ summary: "Rolni nomi boyicha olish" })
  @Get(":value")
  findOne(@Param("value") value: string) {
    return this.roleService.findByValue(value);
  }
}
