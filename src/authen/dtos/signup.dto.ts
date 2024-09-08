import { IsEmail, IsString, Matches, MinLength } from '@nestjs/class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[a-z])/, { message: 'Mot de passe doit être combinaison' })
  password: string;
}
