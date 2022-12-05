import { Injectable, BadRequestException } from '@nestjs/common';
import { EmpresaDto } from '../../shared/dtos/empresa/empresa.dto';
import { EmpresaTypeormRepository } from '../data/typeorm/empresa.typeorm.repository';
import { EstacionamentoTypeormRepository } from '../data/typeorm/estacionamento.typeorm.repository';
import { EmpresaEntity } from '../domain/entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(
    private readonly repository: EmpresaTypeormRepository,
    private readonly estacionamentoRepository: EstacionamentoTypeormRepository,
  ) {}

  async getById(id: number): Promise<EmpresaEntity> {
    return await this.repository.getById(id);
  }

  async getAll(): Promise<EmpresaEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: EmpresaDto): Promise<EmpresaEntity> {
    return await this.repository.create(model);
  }

  async update(id: number, model: EmpresaDto): Promise<EmpresaEntity> {
    return await this.repository.update(id, model);
  }

  async delete(id: number): Promise<void> {
    const hasRelationalData = await this.estacionamentoRepository.existeEmpresa(
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
