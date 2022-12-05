import { Injectable } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from '../../shared/dtos/usuario/usuario.dto';
import { AuthDto } from '../../shared/dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async validarUsuario(username: string, senha: string): Promise<boolean> {
    const usuario = await this.usuarioService.getOne(username);
    if (usuario) {
      if (usuario.password === senha) {
        return true;
      }
    }
    return false;
  }

  async login(user: UsuarioDto): Promise<AuthDto> {
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
