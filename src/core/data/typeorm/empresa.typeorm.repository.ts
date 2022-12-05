import { Inject, Injectable } from '@nestjs/common';
import { EmpresaEntity } from '../../../core/domain/entities/empresa.entity';
import { CONSTANTS } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IRepositoryBase } from './interface/repositoryBase';
import { EmpresaDto } from '../../../shared/dtos/empresa/empresa.dto';

@Injectable()
export class EmpresaTypeormRepository
  implements IRepositoryBase<EmpresaEntity>
{
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.EMPRESA_REPOSITORY)
    protected repository: Repository<EmpresaEntity>,
  ) {}

  async getById(id: number): Promise<EmpresaEntity> {
    return await this.repository.findOneByOrFail({ id });
  }

  async getAll(): Promise<EmpresaEntity[]> {
    return await this.repository.find();
  }

  async create(model: EmpresaDto): Promise<EmpresaEntity> {
    return await this.repository.save(model);
  }

  async update(id: number, model: EmpresaDto) {
    const entity = await this.repository.findOneByOrFail({ id });

    this.repository.merge(entity, model);
    return await this.repository.save(entity);
  }

  async delete(id: number): Promise<void> {
    const entity = await this.repository.findOneByOrFail({ id });
    await this.repository.remove(entity);
  }
}
