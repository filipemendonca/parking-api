import { ApiProperty } from '@nestjs/swagger';

export class ReportsSummaryDto {
  @ApiProperty()
  public totalEntradaSaida: number;
  @ApiProperty()
  public totalCarros: number;
  @ApiProperty()
  public totalMotos: number;
  @ApiProperty()
  public totalNaoFinalizados: number;
}
