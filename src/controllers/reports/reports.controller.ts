import { Controller, UseGuards, Get } from '@nestjs/common';
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

@Controller('api/v1/reports')
@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private estacionamentoService: EstacionamentoService) {}

  @Get('/entradaSaida')
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
}
