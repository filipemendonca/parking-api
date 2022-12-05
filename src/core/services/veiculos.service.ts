import { BadRequestException, Injectable } from '@nestjs/common';
import { VeiculosDto } from 'src/shared/dtos/veiculos/veiculos.dto';
import { EstacionamentoTypeormRepository } from '../data/typeorm/estacionamento.typeorm.repository';
import { VeiculosTypeormRepository } from '../data/typeorm/veiculos.typeorm.repository';
import { VeiculosEntity } from '../domain/entities/veiculos.entity';

@Injectable()
export class VeiculosService {
  constructor(
    private readonly repository: VeiculosTypeormRepository,
    private readonly estacionamentoRepository: EstacionamentoTypeormRepository,
  ) {}

  async getById(id: number): Promise<VeiculosEntity> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<VeiculosEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: VeiculosDto): Promise<VeiculosEntity> {
    return await this.repository.create(model);
  }

  async update(id: number, model: VeiculosDto): Promise<VeiculosEntity> {
    return await this.repository.update(id, model);
  }

  async delete(id: number): Promise<void> {
    const hasRelationalData = await this.estacionamentoRepository.existeVeiculo(
      id,
    );

    if (hasRelationalData) {
      throw new BadRequestException(
        'Existe registros relacionados ao estacionamento.',
      );
    }

    await this.repository.delete(id);
  }
}
