import { CONSTANTS } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { EmpresaEntity } from '../../../core/domain/entities/empresa.entity';

export const empresaProviders = [
  {
    provide: CONSTANTS.DB_REPOSITORIES.EMPRESA_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EmpresaEntity),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
