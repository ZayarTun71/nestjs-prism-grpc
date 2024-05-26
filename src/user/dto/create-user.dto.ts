import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Name must be a string' })
  readonly name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  readonly email: string;
}