import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Name must be a string' })
  @IsOptional()
  readonly name?: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsOptional()
  readonly email?: string;
}