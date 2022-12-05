import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VeiculosDto } from '../../shared/dtos/veiculos/veiculos.dto';
import { BadRequest } from '../../shared/helpers/bad.request';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioDto } from 'src/shared/dtos/usuario/usuario.dto';

@Controller('api/v1/usuario')
@ApiTags('Usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um novo usuario' })
  @ApiResponse({
    status: 201,
    description: 'Operação realizada com sucesso!',
    type: VeiculosDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async create(@Body() body: UsuarioDto) {
    return await this.usuarioService.create(body);
  }
}
