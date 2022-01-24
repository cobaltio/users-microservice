import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  name: string;

  @IsNotEmpty()
  public_address: string;

  username: string;

  nonce: string;

  @IsEmail()
  email: string;
}
