import { Inject, Injectable } from '@nestjs/common';
import { CONSTANTS } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IRepositoryBase } from './interface/repositoryBase';
import { UsuarioEntity } from '../../../core/domain/entities/usuario.entity';
import { UsuarioDto } from '../../../shared/dtos/usuario/usuario.dto';

@Injectable()
export class UsuarioTypeormRepository
  implements IRepositoryBase<UsuarioEntity>
{
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.USUARIO_REPOSITORY)
    public repository: Repository<UsuarioEntity>,
  ) {}

  async getById(id: number): Promise<UsuarioEntity> {
    return await this.repository.findOneByOrFail({ id });
  }

  async getOne(username: string): Promise<UsuarioEntity | undefined> {
    return this.repository.findOne({ where: { username } });
  }

  async getAll(): Promise<UsuarioEntity[]> {
    return await this.repository.find({ order: { id: 'ASC' } });
  }

  async create(model: UsuarioDto): Promise<UsuarioEntity> {
    return await this.repository.save(this.repository.create(model));
  }

  async update(id: number, model: UsuarioDto) {
    const entity = await this.repository.findOneByOrFail({ id });

    this.repository.merge(entity, model);
    return await this.repository.save(entity);
  }

  async delete(id: number) {
    const entity = await this.repository.findOneByOrFail({ id });
    await this.repository.remove(entity);
  }
}
