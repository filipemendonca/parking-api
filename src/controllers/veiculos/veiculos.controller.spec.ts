import { Test, TestingModule } from '@nestjs/testing';
import { VeiculosEntity } from '../../core/domain/entities/veiculos.entity';
import { VeiculosDto } from '../../shared/dtos/veiculos/veiculos.dto';
import { VeiculosService } from '../../core/services/veiculos.service';
import { VeiculosController } from './veiculos.controller';

const veiculosListMock: VeiculosEntity[] = [
  {
    id: 1,
    cor: 'preto',
    marca: 'chevrolet',
    modelo: 'prisma',
    placa: 'ABC7777',
    tipo: 'C',
  },
  {
    id: 1,
    cor: 'vermelho',
    marca: 'honda',
    modelo: 'CG',
    placa: 'CCC1111',
    tipo: 'M',
  },
];

const veiculosDtoMock: VeiculosDto = {
  cor: 'vermelho',
  marca: 'honda',
  modelo: 'CG',
  placa: 'CCC1111',
  tipo: 'M',
};

describe('VeiculosController', () => {
  let veiculosController: VeiculosController;
  let veiculosService: VeiculosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VeiculosController],
      providers: [
        {
          provide: VeiculosService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            getAll: jest.fn().mockResolvedValue(veiculosListMock),
            create: jest.fn().mockResolvedValue(veiculosDtoMock),
            update: jest.fn().mockResolvedValue(veiculosDtoMock),
            delete: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    veiculosController = module.get<VeiculosController>(VeiculosController);
    veiculosService = module.get<VeiculosService>(VeiculosService);
  });

  it('should be defined', () => {
    expect(veiculosController).toBeDefined();
    expect(veiculosService).toBeDefined();
  });

  describe('index', () => {
    it('should return a list index', async () => {
      const result = await veiculosController.index();

      expect(result).toEqual(veiculosListMock);
      expect(typeof result).toEqual('object');
      expect(veiculosService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(veiculosService, 'getAll').mockRejectedValueOnce(new Error());

      expect(veiculosController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a new created vehicle', async () => {
      const result = await veiculosController.create(veiculosDtoMock);

      expect(result).toEqual(veiculosDtoMock);
      expect(typeof result).toEqual('object');
      expect(veiculosService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(veiculosService, 'create').mockRejectedValueOnce(new Error());

      expect(veiculosController.create(veiculosDtoMock)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a updated vehicle', async () => {
      const result = await veiculosController.update(1, veiculosDtoMock);

      expect(result).toEqual(veiculosDtoMock);
      expect(typeof result).toEqual('object');
      expect(veiculosService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(veiculosService, 'update').mockRejectedValueOnce(new Error());

      expect(
        veiculosController.update(1, veiculosDtoMock),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should delete the vehicle by id', async () => {
      const result = await veiculosController.destroy(1);

      expect(result).toBeUndefined();
      expect(veiculosService.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(veiculosService, 'delete').mockRejectedValueOnce(new Error());

      expect(veiculosController.destroy(1)).rejects.toThrowError();
    });
  });
});
