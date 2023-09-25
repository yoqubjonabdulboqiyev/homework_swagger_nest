import { IsEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "2", description: "Foydalanuvchi ID" })
  @IsNumber()
  @IsEmpty()
  readonly userID: number;

  @ApiProperty({ example: "USER", description: "Foydalanuvchi DARAJASI" })
  @IsEmpty()
  @IsString()
  readonly value: string;
}
