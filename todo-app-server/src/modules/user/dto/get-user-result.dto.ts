import { IsEmail, IsUUID } from "class-validator";

export class GetUserResultDto {
  @IsUUID("4")
  id: string;

  @IsEmail()
  email: string;
}