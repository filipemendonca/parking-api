import { Injectable } from '@nestjs/common';
import { EstacionamentoDto } from 'src/shared/dtos/estacionamento.dto';
import { EstacionamentoTypeormRepository } from '../data/typeorm/estacionamento.typeorm.repository';
import { EstacionamentoEntity } from '../domain/entities/estacionamento.entity';

@Injectable()
export class EstacionamentoService {
  constructor(private readonly repository: EstacionamentoTypeormRepository) {}

  async getAll(): Promise<EstacionamentoEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: EstacionamentoDto): Promise<EstacionamentoEntity> {
    return await this.repository.create(model);
  }
}
