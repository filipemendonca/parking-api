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

  async entradaSaidaReport(
    horaInial?: string,
    horaFinal?: string,
  ): Promise<ReportsSummaryDto> {
    let qtdCarros = 0;
    let qtdMotos = 0;
    let qtdNaoFinalizados = 0;
    let query = '';

    if (horaInial && horaFinal) {
      query = `SELECT * FROM Estacionamento WHERE HOUR(data_entrada) >= HOUR('${horaInial}') AND HOUR(data_saida) <= HOUR('${horaFinal}')`;
    } else {
      query = 'SELECT * FROM Estacionamento';
    }

    const entityArray = await this.repository.getByQuery(query);

    if (entityArray) {
      for (let i = 0; i < entityArray.length; i++) {
        const { veiculoId, finalizado } = entityArray[i];
        const veiculo = await this.veiculoRepository.getById(veiculoId);

        if (veiculo.tipo === 'C') {
          qtdCarros++;
        } else {
          qtdMotos++;
        }

        if (!finalizado) {
          qtdNaoFinalizados++;
        }
      }
    }

    return {
      totalCarros: qtdCarros,
      totalMotos: qtdMotos,
      totalNaoFinalizados: qtdNaoFinalizados,
      totalEntradaSaida: entityArray.length,
    };
  }

  async createRunner(): Promise<QueryRunner> {
    return this.repository.createRunner();
  }
}
