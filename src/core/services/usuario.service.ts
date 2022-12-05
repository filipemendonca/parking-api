import { Injectable } from '@nestjs/common';
import { UsuarioDto } from '../../shared/dtos/usuario/usuario.dto';
import { UsuarioTypeormRepository } from '../data/typeorm/usuario.typeorm.repository';
import { UsuarioEntity } from '../domain/entities/usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(private readonly repository: UsuarioTypeormRepository) {}

  async getById(id: number): Promise<UsuarioEntity> {
    return await this.repository.getById(id);
  }

  async getOne(username: string): Promise<UsuarioEntity> {
    return await this.repository.getOne(username);
  }

  async getAll(): Promise<UsuarioEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: UsuarioDto): Promise<UsuarioEntity> {
    return await this.repository.create(model);
  }

  async update(id: number, model: UsuarioDto): Promise<UsuarioEntity> {
    return await this.repository.update(id, model);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
