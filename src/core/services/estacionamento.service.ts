import { Injectable } from '@nestjs/common';
import { EstacionamentoDto } from '../../shared/dtos/estacionamento/estacionamento.dto';
import { EstacionamentoTypeormRepository } from '../data/typeorm/estacionamento.typeorm.repository';
import { EstacionamentoEntity } from '../domain/entities/estacionamento.entity';

@Injectable()
export class EstacionamentoService {
  constructor(private readonly repository: EstacionamentoTypeormRepository) {}

  async getById(id: number): Promise<EstacionamentoEntity> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<EstacionamentoEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: EstacionamentoDto): Promise<EstacionamentoEntity> {
    return await this.repository.create(model);
  }

  async update(
    id: number,
    model: EstacionamentoDto,
  ): Promise<EstacionamentoEntity> {
    return await this.repository.update(id, model);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
