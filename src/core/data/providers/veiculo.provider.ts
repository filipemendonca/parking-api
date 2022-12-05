import { CONSTANTS } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { VeiculosEntity } from '../../../core/domain/entities/veiculos.entity';

export const veiculosProviders = [
  {
    provide: CONSTANTS.DB_REPOSITORIES.VEICULO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VeiculosEntity),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
