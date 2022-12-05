import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EstacionamentoDto {
  @IsNotEmpty()
  @ApiProperty()
  public veiculoId: number;

  @IsNotEmpty()
  @ApiProperty()
  public empresaId: number;

  @ApiProperty()
  public dataEntrada: Date;

  @ApiProperty()
  public dataSaida: Date;
}
