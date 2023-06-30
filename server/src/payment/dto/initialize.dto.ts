import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InitializeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  amount: string;
}
