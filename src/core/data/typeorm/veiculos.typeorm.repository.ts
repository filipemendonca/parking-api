import { Inject, Injectable } from '@nestjs/common';
import { VeiculosEntity } from '../../../core/domain/entities/veiculos.entity';
import { CONSTANTS } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IRepositoryBase } from './interface/repositoryBase';
import { VeiculosDto } from 'src/shared/dtos/veiculos/veiculos.dto';

@Injectable()
export class VeiculosTypeormRepository
  implements IRepositoryBase<VeiculosEntity>
{
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.VEICULO_REPOSITORY)
    public repository: Repository<VeiculosEntity>,
  ) {}

  async getById(id: number): Promise<VeiculosEntity> {
    return await this.repository.findOneByOrFail({ id });
  }

  async getAll(): Promise<VeiculosEntity[]> {
    return await this.repository.find({ order: { id: 'ASC' } });
  }

  async create(model: VeiculosDto): Promise<VeiculosEntity> {
    return await this.repository.save(this.repository.create(model));
  }

  async update(id: number, model: VeiculosDto) {
    const entity = await this.repository.findOneByOrFail({ id });

    this.repository.merge(entity, model);
    return await this.repository.save(entity);
  }

  async delete(id: number) {
    const entity = await this.repository.findOneByOrFail({ id });
    await this.repository.remove(entity);
  }
}
