import { IsNotEmpty, IsString } from 'class-validator';

export class CarDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
