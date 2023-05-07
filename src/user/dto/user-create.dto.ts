import { IsNotEmpty, IsString, IsEmail, MinLength, IsEnum, IsNumber } from 'class-validator';
import { GenderEnum } from 'src/enums/user.enum';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsNotEmpty()
  @IsNumber()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsNumber()
  neck: number;

  @IsNotEmpty()
  @IsNumber()
  waist: number;

  @IsNotEmpty()
  @IsNumber()
  hip: number;
}
