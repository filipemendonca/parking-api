import { ApiProperty } from '@nestjs/swagger';

export class EmpresaUpdateDto {
  @ApiProperty()
  public nome: string;

  @ApiProperty({ maxLength: 14 })
  public cnpj: string;

  @ApiProperty()
  public endereco: string;

  @ApiProperty()
  public qtdVagasCarros: number;

  @ApiProperty()
  public qtdVagasMotos: number;
}
