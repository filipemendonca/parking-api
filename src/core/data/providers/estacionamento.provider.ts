import { CONSTANTS } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { EstacionamentoEntity } from '../../../core/domain/entities/estacionamento.entity';

export const estacionamentoProviders = [
  {
    provide: CONSTANTS.DB_REPOSITORIES.ESTACIONAMENTO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EstacionamentoEntity),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
