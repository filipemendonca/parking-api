import { Injectable } from '@nestjs/common';
import { EmpresaDto } from 'src/shared/dtos/empresa.dto';
import { EmpresaTypeormRepository } from '../data/typeorm/empresa.typeorm.repository';
import { EmpresaEntity } from '../domain/entities/empresa.entity';

@Injectable()
export class EmpresaService {
  constructor(private readonly repository: EmpresaTypeormRepository) {}

  async getAll(): Promise<EmpresaEntity[]> {
    return await this.repository.getAll();
  }

  async create(model: EmpresaDto): Promise<EmpresaEntity> {
    return await this.repository.create(model);
  }
}
