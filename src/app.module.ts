import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmpresaController } from './controllers/empresa/empresa.controller';
import { EstacionamentoController } from './controllers/estacionamento/estacionamento.controller';
import { UsuarioController } from './controllers/usuario/usuario.controller';
import { VeiculosController } from './controllers/veiculos/veiculos.controller';
import { DatabaseModule } from './core/data/module/database.module';
import { EmpresaTypeormRepository } from './core/data/typeorm/empresa.typeorm.repository';
import { EstacionamentoTypeormRepository } from './core/data/typeorm/estacionamento.typeorm.repository';
import { UsuarioTypeormRepository } from './core/data/typeorm/usuario.typeorm.repository';
import { VeiculosTypeormRepository } from './core/data/typeorm/veiculos.typeorm.repository';
import { EmpresaService } from './core/services/empresa.service';
import { EstacionamentoService } from './core/services/estacionamento.service';
import { UsuarioService } from './core/services/usuario.service';
import { VeiculosService } from './core/services/veiculos.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
  ],
  controllers: [
    UsuarioController,
    VeiculosController,
    EmpresaController,
    EstacionamentoController,
  ],
  providers: [
    VeiculosTypeormRepository,
    EmpresaTypeormRepository,
    EstacionamentoTypeormRepository,
    UsuarioTypeormRepository,
    VeiculosService,
    EmpresaService,
    EstacionamentoService,
    UsuarioService,
  ],
})
export class AppModule {}
