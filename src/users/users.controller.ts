import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AddRoleDto } from "./dto/add-role-dto";
import { ActivateUserDto } from "./dto/activate-user-dto";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@ApiTags("Userlar")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: "User create" })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @ApiOperation({ summary: "Userlarni korish" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: "Role qoshish" })
  @HttpCode(200)
  @Post("add_role")
  AddRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.addRole(addRoleDto);
  }

  @ApiOperation({ summary: "Role ochirish" })
  @HttpCode(200)
  @Post("remove_role")
  RemoveRole(@Body() addRoleDto: AddRoleDto) {
    return this.usersService.removeRole(addRoleDto);
  }

  @ApiOperation({ summary: "Userni faollashtirish" })
  @HttpCode(200)
  @Post("activate")
  activateUser(@Body() activateUserDto: ActivateUserDto) {
    return this.usersService.activateUser(activateUserDto);
  }
  /* @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  } */

  /* @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
