import { IsNumber, IsEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ActivateUserDto {
  @ApiProperty({ example: "2", description: "Foydalanuvchi ID" })
  @IsNumber()
  @IsEmpty()
  readonly userID: number;
}
