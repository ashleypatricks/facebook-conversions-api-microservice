import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  fbLoginId: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  dob: string;
}
