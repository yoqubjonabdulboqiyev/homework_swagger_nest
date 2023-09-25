import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { loginDto } from "./dto/loginDto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async registration(userDto: CreateUserDto) {
    const condiate = await this.userService.findUserByEmail(userDto.email);
    if (condiate)
      throw new HttpException(
        "User already registered",
        HttpStatus.BAD_REQUEST,
      );

    const hashedPass = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.create({
      ...userDto,
      password: hashedPass,
    });

    return this.generateToken(user);
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }
  async login(LoginDto: loginDto) {
    const user = await this.validateUser(LoginDto);
    if (!user) throw new UnauthorizedException("Email or password incorrect");
    return this.generateToken(user);
  }
  private async validateUser(LoginDto: loginDto) {
    const user = await this.userService.findUserByEmail(LoginDto.email);
    if (!user) throw new UnauthorizedException("Email or password incorrect");

    const validPass = await bcrypt.compare(LoginDto.password, user.password);
    if (validPass) return user;
    throw new UnauthorizedException("Email or password incorrect");
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
}
