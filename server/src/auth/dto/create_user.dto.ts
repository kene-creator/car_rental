import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../enums/roles.enums';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsArray()
  @IsNotEmpty()
  roles: Role[];
}
