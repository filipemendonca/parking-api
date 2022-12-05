import { CONSTANTS } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { VeiculosEntity } from '../../../core/domain/entities/veiculos.entity';
import { EmpresaEntity } from '../../../core/domain/entities/empresa.entity';
import { EstacionamentoEntity } from '../../../core/domain/entities/estacionamento.entity';

export const databaseProviders = [
  {
    provide: CONSTANTS.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
          ? parseInt(process.env.DATABASE_PORT)
          : 3306,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_SCHEMA,
        entities: [VeiculosEntity, EmpresaEntity, EstacionamentoEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
