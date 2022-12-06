import { ApiProperty } from '@nestjs/swagger';

export class ReportsSummaryPerHourDto {
  @ApiProperty()
  public horaInicial: string;

  @ApiProperty()
  public horaFinal: string;
}
