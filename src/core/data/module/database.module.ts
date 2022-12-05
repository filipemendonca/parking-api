import { Module } from '@nestjs/common';
import { databaseProviders } from '../providers/database.provider';
import { empresaProviders } from '../providers/empresa.provider';
import { estacionamentoProviders } from '../providers/estacionamento.provider';
import { usuarioProviders } from '../providers/usuario.provider';
import { veiculosProviders } from '../providers/veiculo.provider';

@Module({
  providers: [
    ...databaseProviders,
    ...veiculosProviders,
    ...empresaProviders,
    ...estacionamentoProviders,
    ...usuarioProviders,
  ],
  exports: [
    ...databaseProviders,
    ...veiculosProviders,
    ...empresaProviders,
    ...estacionamentoProviders,
    ...usuarioProviders,
  ],
})
export class DatabaseModule {}
