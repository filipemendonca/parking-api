import { Injectable } from '@nestjs/common';
import { ReportsSummaryDto } from '../../shared/dtos/reports/reports.summary.dto';
import { EstacionamentoDto } from '../../shared/dtos/estacionamento/estacionamento.dto';
import { EstacionamentoTypeormRepository } from '../data/typeorm/estacionamento.typeorm.repository';
import { EstacionamentoEntity } from '../domain/entities/estacionamento.entity';
import { VeiculosTypeormRepository } from '../data/typeorm/veiculos.typeorm.repository';
import { QueryRunner } from 'typeorm';

@Injectable()
export class EstacionamentoService {
  constructor(
    private readonly repository: EstacionamentoTypeormRepository,
    private readonly veiculoRepository: VeiculosTypeormRepository,
  ) {}

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

  async entradaSaidaReport(): Promise<ReportsSummaryDto> {
    const report = new ReportsSummaryDto();
    const query = 'SELECT * FROM Estacionamento WHERE finalizado = false';
    const entityArray = await this.repository.getByQuery(query);

    if (entityArray) {
      entityArray.forEach(async (item) => {
        const { dataEntrada, finalizado, dataSaida } = item;
        const veiculo = await this.veiculoRepository.getById(item.veiculoId);
        report.estacionamentoList.push({
          veiculo,
          dataEntrada,
          dataSaida,
          finalizado,
        });
      });
      report.totalEntradaSaida = entityArray.length;
    }

    return report;
  }

  async createRunner(): Promise<QueryRunner> {
    return this.repository.createRunner();
  }
}
