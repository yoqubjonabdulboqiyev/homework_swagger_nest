import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "Example", description: "Foydalanuvchi nomi" })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Example@gmail.com",
    description: "Foydalanuvchi emaili",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: "Qwert1245!!#", description: "Foydalanuvchi paroli" })
  @IsNotEmpty()
  password: string;
}
