import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EstacionamentoService } from '../../core/services/estacionamento.service';
import { EstacionamentoDto } from '../../shared/dtos/estacionamento/estacionamento.dto';
import { BadRequest } from '../../shared/helpers/bad.request';

@Controller('api/v1/estacionamento')
@ApiTags('Estacionamento')
export class EstacionamentoController {
  constructor(private estacionamentoService: EstacionamentoService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar todos dados cruzados de empresa x veiculo cadastrados',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de dados do estacionamento retornada com sucesso',
    type: EstacionamentoDto,
    isArray: true,
  })
  async index() {
    return await this.estacionamentoService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Efetua a ação de estacionar' })
  @ApiResponse({
    status: 201,
    description: 'Veículo estacionado com sucesso!',
    type: EstacionamentoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async estacionar(@Body() body: EstacionamentoDto) {
    return await this.estacionamentoService.create(body);
  }
}
