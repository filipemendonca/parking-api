import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EmpresaDto {
  @IsNotEmpty()
  @ApiProperty()
  public nome: string;

  @IsNotEmpty()
  @ApiProperty({ maxLength: 14 })
  public cnpj: string;

  @IsNotEmpty()
  @ApiProperty()
  public endereco: string;

  @IsNotEmpty()
  @ApiProperty()
  public qtdVagasCarros: number;

  @IsNotEmpty()
  @ApiProperty()
  public qtdVagasMotos: number;
}
