import { Body, Controller, Post, BadGatewayException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VeiculosDto } from '../../shared/dtos/veiculos/veiculos.dto';
import { BadRequest } from '../../shared/helpers/bad.request';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioDto } from '../../shared/dtos/usuario/usuario.dto';
import { AuthService } from '../../core/services/auth.service';
import { AuthDto } from '../../shared/dtos/auth.dto';

@Controller('api/v1/usuario')
@ApiTags('Usuario')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

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

  @Post('login')
  @ApiOperation({ summary: 'Efetuar login e capturar o access_token' })
  @ApiResponse({
    status: 201,
    description: 'Operação realizada com sucesso!',
    type: AuthDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Parâmetros inválidos',
    type: BadRequest,
  })
  async login(@Body() body: UsuarioDto) {
    const validateUser = await this.authService.validarUsuario(
      body.username,
      body.password,
    );

    if (!validateUser) {
      throw new BadGatewayException();
    }

    return this.authService.login(body);
  }
}
