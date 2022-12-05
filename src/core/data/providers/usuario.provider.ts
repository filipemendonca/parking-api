import { CONSTANTS } from '../../../shared/constants';
import { DataSource } from 'typeorm';
import { UsuarioEntity } from '../../../core/domain/entities/usuario.entity';

export const usuarioProviders = [
  {
    provide: CONSTANTS.DB_REPOSITORIES.USUARIO_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UsuarioEntity),
    inject: [CONSTANTS.DATA_SOURCE],
  },
];
