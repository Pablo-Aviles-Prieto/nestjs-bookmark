import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// In order to use the transformation and validations classes from nestJS package (class-validator class-transformer)
// we have to use a class, instead of using a simple typescript interface, to use the decorators
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
