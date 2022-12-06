import { Test, TestingModule } from '@nestjs/testing';
import { EstacionamentoUpdateDto } from 'src/shared/dtos/estacionamento/estacionament.update.dto';
import { EstacionamentoFinalizeDto } from 'src/shared/dtos/estacionamento/estacionamento.finalize.dto';
import { EstacionamentoEntity } from '../../core/domain/entities/estacionamento.entity';
import { EmpresaService } from '../../core/services/empresa.service';
import { EstacionamentoService } from '../../core/services/estacionamento.service';
import { VeiculosService } from '../../core/services/veiculos.service';
import { EmpresaDto } from '../../shared/dtos/empresa/empresa.dto';
import { EstacionamentoDto } from '../../shared/dtos/estacionamento/estacionamento.dto';
import { VeiculosDto } from '../../shared/dtos/veiculos/veiculos.dto';
import { EstacionamentoController } from './estacionamento.controller';
const estacionamentoListMock: EstacionamentoEntity[] = [
  {
    id: 1,
    empresaId: 1,
    veiculoId: 1,
    finalizado: false,
    dataEntrada: new Date(),
    dataSaida: new Date(),
  },
  {
    id: 2,
    empresaId: 2,
    veiculoId: 2,
    finalizado: true,
    dataEntrada: new Date(),
    dataSaida: new Date(),
  },
];

const estacionamentoDtoMock: EstacionamentoDto = {
  empresaId: 2,
  veiculoId: 2,
  finalizado: true,
  dataEntrada: new Date(),
};

const estacionamentoEntityMock: EstacionamentoEntity = {
  id: 1,
  empresaId: 2,
  veiculoId: 2,
  finalizado: true,
  dataEntrada: new Date(),
  dataSaida: new Date(),
};

const estacionamentoFinalizeDto: EstacionamentoFinalizeDto = {
  dataSaida: new Date(),
  finalizado: true,
};

const estacionamentoUpdateDto: EstacionamentoUpdateDto = {
  empresaId: 2,
  veiculoId: 2,
  finalizado: true,
  dataEntrada: new Date(),
  dataSaida: new Date(),
};

const empresaDtoMock: EmpresaDto = {
  cnpj: '28345678234537',
  endereco: 'Rua teste',
  nome: 'teste2',
  qtdVagasCarros: 1,
  qtdVagasMotos: 1,
};

const veiculosDtoMock: VeiculosDto = {
  cor: 'vermelho',
  marca: 'honda',
  modelo: 'CG',
  placa: 'CCC1111',
  tipo: 'M',
};

describe('EstacionamentoController', () => {
  let estacionamentoController: EstacionamentoController;
  let estacionamentoService: EstacionamentoService;
  let empresaService: EmpresaService;
  let veiculosService: VeiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstacionamentoController],
      providers: [
        {
          provide: EstacionamentoService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            getAll: jest.fn().mockResolvedValue(estacionamentoListMock),
            create: jest.fn().mockResolvedValue(estacionamentoDtoMock),
            update: jest.fn().mockResolvedValue(estacionamentoUpdateDto),
          },
        },
        {
          provide: EmpresaService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(empresaDtoMock),
          },
        },
        {
          provide: VeiculosService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            update: jest.fn().mockResolvedValue(veiculosDtoMock),
          },
        },
      ],
    }).compile();

    estacionamentoController = module.get<EstacionamentoController>(
      EstacionamentoController,
    );
    estacionamentoService = module.get<EstacionamentoService>(
      EstacionamentoService,
    );
    veiculosService = module.get<VeiculosService>(VeiculosService);
    empresaService = module.get<EmpresaService>(EmpresaService);
  });

  it('should be defined', () => {
    expect(estacionamentoController).toBeDefined();
    expect(estacionamentoService).toBeDefined();
    expect(veiculosService).toBeDefined();
    expect(empresaService).toBeDefined();
  });

  describe('index', () => {
    it('should return a list index', async () => {
      const result = await estacionamentoController.index();

      expect(result).toEqual(estacionamentoListMock);
      expect(typeof result).toEqual('object');
      expect(estacionamentoService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(estacionamentoService, 'getAll')
        .mockRejectedValueOnce(new Error());

      expect(estacionamentoController.index()).rejects.toThrowError();
    });
  });

  describe('park', () => {
    it('should execute park and return a new created parking', async () => {
      const result = await estacionamentoController.park(estacionamentoDtoMock);

      expect(result).toEqual(estacionamentoDtoMock);
      expect(typeof result).toEqual('object');

      expect(veiculosService.getById).toHaveBeenCalledTimes(1);
      expect(empresaService.getById).toHaveBeenCalledTimes(1);

      const empresaResult = await empresaService.update(1, empresaDtoMock);

      expect(empresaResult).toEqual(empresaDtoMock);
      expect(typeof empresaResult).toEqual('object');
      expect(empresaService.update).toHaveBeenCalledTimes(2);

      expect(estacionamentoService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(estacionamentoService, 'create')
        .mockRejectedValueOnce(new Error());

      expect(
        estacionamentoController.park(estacionamentoDtoMock),
      ).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a updated park', async () => {
      const result = await estacionamentoController.updatePark(
        1,
        estacionamentoUpdateDto,
      );

      expect(result).toEqual(estacionamentoUpdateDto);
      expect(typeof result).toEqual('object');
      expect(estacionamentoService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(estacionamentoService, 'update')
        .mockRejectedValueOnce(new Error());

      expect(
        estacionamentoController.updatePark(1, estacionamentoUpdateDto),
      ).rejects.toThrowError();
    });
  });
});
