import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EstacionamentoDto {
  @IsNotEmpty()
  @ApiProperty()
  public veiculoId: number;

  @IsNotEmpty()
  @ApiProperty()
  public empresaId: number;

  @IsNotEmpty()
  @ApiProperty()
  public dataEntrada: Date;

  @IsNotEmpty()
  @ApiProperty()
  public finalizado: boolean;
}
