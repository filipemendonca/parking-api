import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { VeiculosUpdateDto } from '../../shared/dtos/veiculos/veiculos.update.dto';
import { NotFound } from '../../shared/helpers/not.found';
import { VeiculosService } from '../../core/services/veiculos.service';
import { VeiculosDto } from '../../shared/dtos/veiculos/veiculos.dto';
import { BadRequest } from '../../shared/helpers/bad.request';
import { JwtAuthGuard } from '../../core/auth/jwt-auth.guard';

@Controller('api/v1/veiculos')
@ApiTags('Veiculos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class VeiculosController {
  constructor(private veiculosService: VeiculosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de veículos retornada com sucesso',
    type: VeiculosDto,
    isArray: true,
  })
  async index() {
    return await this.veiculosService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo veículo' })
  @ApiResponse({
    status: 201,
    description: 'Novo veículo criada com sucesso',
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

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de um veículo' })
  @ApiResponse({
    status: 200,
    description: 'Veículo atualizado com sucesso',
    type: VeiculosUpdateDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: VeiculosUpdateDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Veículo não foi encontrado',
    type: VeiculosUpdateDto,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: VeiculosUpdateDto,
  ) {
    return await this.veiculosService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um veículo' })
  @ApiResponse({ status: 204, description: 'Veículo removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Veículo não foi encontrado',
    type: NotFound,
  })
  async destroy(@Param('id', new ParseIntPipe()) id: number) {
    await this.veiculosService.delete(id);
  }
}
