import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EstacionamentoUpdateDto } from 'src/shared/dtos/estacionamento/estacionament.update.dto';
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
    description: 'Operação realizada com sucesso.!',
    type: EstacionamentoDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async park(@Body() body: EstacionamentoDto) {
    return await this.estacionamentoService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados do veículo estacionado' })
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso!',
    type: EstacionamentoUpdateDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: EstacionamentoUpdateDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Registro não foi encontrado',
    type: EstacionamentoUpdateDto,
  })
  async updatePark(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: EstacionamentoUpdateDto,
  ) {
    return await this.estacionamentoService.update(id, body);
  }
}
