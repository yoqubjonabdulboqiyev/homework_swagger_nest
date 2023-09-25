import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { loginDto } from "./dto/loginDto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: "Register qismi" })
  @Post("register")
  registration(@Body() registerDto: CreateUserDto) {
    return this.authService.registration(registerDto);
  }

  @ApiOperation({ summary: "Login qismi" })
  @Post("login")
  login(@Body() LoginDto: loginDto) {
    return this.authService.login(LoginDto);
  }

  @ApiOperation({ summary: "Barcha userlarni korish" })
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @ApiOperation({ summary: " userni id korish" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authService.findOne(+id);
  }
}
