import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UsuarioDto {
  @IsNotEmpty()
  @ApiProperty()
  public username: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
