import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EstacionamentoFinalizeDto {
  @ApiProperty()
  @IsNotEmpty()
  public dataSaida: Date;

  @IsNotEmpty()
  @ApiProperty()
  public finalizado: boolean;
}
