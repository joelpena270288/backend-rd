import { IsNumber, IsEmail, IsString } from 'class-validator';
export class CodigoDto {
  @IsString()
  readonly codigo: string;
  @IsString()
  readonly username: string;
}
