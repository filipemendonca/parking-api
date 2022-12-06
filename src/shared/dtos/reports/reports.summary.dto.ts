import { ApiProperty } from '@nestjs/swagger';
import { EstacionamentoReportDto } from '../estacionamento/estacionament.report.dto';

export class ReportsSummaryDto {
  @ApiProperty()
  public estacionamentoList: EstacionamentoReportDto[];
  @ApiProperty()
  public totalEntradaSaida: number;
}
