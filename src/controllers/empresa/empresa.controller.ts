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
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { EmpresaUpdateDto } from 'src/shared/dtos/empresa/empresa.update.dto';
import { NotFound } from '../../shared/helpers/not.found';
import { EmpresaService } from '../../core/services/empresa.service';
import { EmpresaDto } from '../../shared/dtos/empresa/empresa.dto';
import { BadRequest } from '../../shared/helpers/bad.request';

@Controller('api/v1/empresa')
@ApiTags('Empresa')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class EmpresaController {
  constructor(private empresaService: EmpresaService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os empresas cadastrados' })
  @ApiResponse({
    status: 200,
    description: 'Lista de empresas retornada com sucesso',
    type: EmpresaDto,
    isArray: true,
  })
  async index() {
    return await this.empresaService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Adicionar uma nova empresa' })
  @ApiResponse({
    status: 201,
    description: 'Nova empresa criada com sucesso',
    type: EmpresaDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async create(@Body() body: EmpresaDto) {
    return await this.empresaService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar os dados de uma empresa' })
  @ApiResponse({
    status: 200,
    description: 'Empresa atualizada com sucesso',
    type: EmpresaUpdateDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: EmpresaUpdateDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Empresa não foi encontrada',
    type: EmpresaUpdateDto,
  })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: EmpresaUpdateDto,
  ) {
    return await this.empresaService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover uma empresa' })
  @ApiResponse({ status: 204, description: 'Empresa removida com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Empresa não foi encontrada',
    type: NotFound,
  })
  async destroy(@Param('id', new ParseIntPipe()) id: number) {
    await this.empresaService.delete(id);
  }
}
