import { Inject, Injectable } from '@nestjs/common';
import { EstacionamentoEntity } from '../../../core/domain/entities/estacionamento.entity';
import { CONSTANTS } from '../../../shared/constants';
import { Repository } from 'typeorm';
import { IRepositoryBase } from './interface/repositoryBase';
import { EstacionamentoDto } from '../../../shared/dtos/estacionamento/estacionamento.dto';

@Injectable()
export class EstacionamentoTypeormRepository
  implements IRepositoryBase<EstacionamentoEntity>
{
  constructor(
    @Inject(CONSTANTS.DB_REPOSITORIES.ESTACIONAMENTO_REPOSITORY)
    private repository: Repository<EstacionamentoEntity>,
  ) {}

  async getById(id: number): Promise<EstacionamentoEntity> {
    return await this.repository.findOneByOrFail({ id });
  }

  async getAll(): Promise<EstacionamentoEntity[]> {
    return await this.repository.find();
  }

  async create(model: EstacionamentoDto): Promise<EstacionamentoEntity> {
    model.finalizado = false;
    return await this.repository.save(model);
  }

  async update(id: number, model: EstacionamentoDto) {
    const entity = await this.repository.findOneByOrFail({ id });

    this.repository.merge(entity, model);
    return await this.repository.save(entity);
  }

  async delete(id: number) {
    const entity = await this.repository.findOneByOrFail({ id });
    await this.repository.remove(entity);
  }

  async existeEmpresa(empresaId: number): Promise<boolean> {
    return await this.repository.exist({ where: { empresaId } });
  }

  async existeVeiculo(veiculoId: number): Promise<boolean> {
    return await this.repository.exist({ where: { veiculoId } });
  }
}
