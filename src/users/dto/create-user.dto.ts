import { ApiProperty, ApiTags } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsStrongPassword,
} from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "User", description: "Foydalanuvchi nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "User@gmail.com",
    description: "Foydalanuvchi email",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: "Qwert1245!!#", description: "Foydalanuvchi paroli" })
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
