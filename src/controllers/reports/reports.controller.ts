import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequest } from '../../shared/helpers/bad.request';
import { EstacionamentoService } from '../../core/services/estacionamento.service';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';
import { ReportsSummaryDto } from '../../shared/dtos/reports/reports.summary.dto';
import { ReportsSummaryPerHourDto } from '../../shared/dtos/reports/reports.perHour.dto';

@Controller('api/v1/reports')
@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private estacionamentoService: EstacionamentoService) {}

  @Post('/entradaSaida')
  @ApiOperation({
    summary: 'Relatório da quantidade de entradas e saídas já finalizadas',
  })
  @ApiResponse({
    status: 201,
    description: 'Operação realizada com sucesso!',
    type: ReportsSummaryDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async qtdEntradaSaidaVeiculos() {
    return await this.estacionamentoService.entradaSaidaReport();
  }

  @Post('/entradaSaidaPorHora')
  @ApiOperation({
    summary: 'Relatório da quantidade de entradas e saídas já finalizadas',
  })
  @ApiResponse({
    status: 201,
    description: 'Operação realizada com sucesso!',
    type: ReportsSummaryPerHourDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async qtdEntradaSaidaVeiculosPorHora(
    @Body() model: ReportsSummaryPerHourDto,
  ) {
    return await this.estacionamentoService.entradaSaidaReport(
      model.horaInicial,
      model.horaFinal,
    );
  }
}
