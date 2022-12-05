import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VeiculosService } from '../../core/services/veiculos.service';
import { VeiculosDto } from '../../shared/dtos/veiculos.dto';
import { BadRequest } from '../../shared/helpers/bad.request';

@Controller('api/v1/veiculos')
@ApiTags('Veiculos')
export class VeiculosController {
  constructor(private veiculosService: VeiculosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veiculos retornada com sucesso',
    type: VeiculosDto,
    isArray: true,
  })
  async index() {
    return await this.veiculosService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo veiculo' })
  @ApiResponse({
    status: 201,
    description: 'Novo veiculo criada com sucesso',
    type: VeiculosDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async create(@Body() body: VeiculosDto) {
    return await this.veiculosService.create(body);
  }
}
