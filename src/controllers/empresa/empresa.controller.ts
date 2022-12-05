import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmpresaService } from '../../core/services/empresa.service';
import { EmpresaDto } from '../../shared/dtos/empresa.dto';
import { BadRequest } from '../../shared/helpers/bad.request';

@Controller('api/v1/empresa')
@ApiTags('Empresa')
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
}
