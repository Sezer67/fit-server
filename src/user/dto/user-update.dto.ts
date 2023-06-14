import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  neck: number;

  @IsOptional()
  @IsNumber()
  waist: number;

  @IsOptional()
  @IsNumber()
  hip: number;
}
