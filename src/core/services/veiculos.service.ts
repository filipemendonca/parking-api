import { Injectable } from '@nestjs/common';
import { VeiculosDto } from 'src/shared/dtos/veiculos.dto';
import { VeiculosTypeormRepository } from '../data/typeorm/veiculos.typeorm.repository';
import { VeiculosEntity } from '../domain/entities/veiculos.entity';

@Injectable()
export class VeiculosService {
  constructor(private readonly repository: VeiculosTypeormRepository) {}

  async getAll(): Promise<VeiculosEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: VeiculosDto): Promise<VeiculosEntity> {
    return await this.repository.create(model);
  }
}
