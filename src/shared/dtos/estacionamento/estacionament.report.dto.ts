import { ApiProperty } from '@nestjs/swagger';
import { VeiculosDto } from '../veiculos/veiculos.dto';

export class EstacionamentoReportDto {
  @ApiProperty()
  public dataEntrada: Date;
  @ApiProperty()
  public dataSaida: Date;
  @ApiProperty()
  public finalizado: boolean;
  @ApiProperty()
  public veiculo: VeiculosDto;
}
