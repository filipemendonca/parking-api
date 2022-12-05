import { Inject, Injectable } from '@nestjs/common';
import { EstacionamentoEntity } from '../../../core/domain/entities/estacionamento.entity';
import { CONSTANTS } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IRepositoryBase } from './interface/repositoryBase';
import { EstacionamentoDto } from '../../../shared/dtos/estacionamento.dto';

@Injectable()
export class EstacionamentoTypeormRepository
  implements IRepositoryBase<EstacionamentoEntity>
{
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.ESTACIONAMENTO_REPOSITORY)
    private repository: Repository<EstacionamentoEntity>,
  ) {}

  async getAll(): Promise<EstacionamentoEntity[]> {
    return await this.repository.find();
  }

  async create(model: EstacionamentoDto): Promise<EstacionamentoEntity> {
    return await this.repository.save(model);
  }

  async update(id: number, model: EstacionamentoDto) {
    const entity = await this.repository.findOneByOrFail({ id });

    this.repository.merge(entity, model);
    return await this.repository.save(entity);
  }

  async delete(id: number) {
    await this.repository.findOneByOrFail({ id });
    await this.repository.softDelete(id);
  }
}
