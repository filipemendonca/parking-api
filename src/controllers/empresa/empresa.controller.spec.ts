import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaEntity } from '../../core/domain/entities/empresa.entity';
import { EmpresaDto } from '../../shared/dtos/empresa/empresa.dto';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from '../../core/services/empresa.service';

const empresaListMock: EmpresaEntity[] = [
  {
    id: 1,
    cnpj: '12345678909876',
    endereco: 'Avenida Teste',
    nome: 'teste',
    qtdVagasCarros: 10,
    qtdVagasMotos: 10,
  },
  {
    id: 1,
    cnpj: '28345678234537',
    endereco: 'Rua teste',
    nome: 'teste2',
    qtdVagasCarros: 20,
    qtdVagasMotos: 20,
  },
];

const empresaDtoMock: EmpresaDto = {
  cnpj: '28345678234537',
  endereco: 'Rua teste',
  nome: 'teste2',
  qtdVagasCarros: 20,
  qtdVagasMotos: 20,
};

describe('EmpresaController', () => {
  let empresaController: EmpresaController;
  let empresaService: EmpresaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            getAll: jest.fn().mockResolvedValue(empresaListMock),
            create: jest.fn().mockResolvedValue(empresaDtoMock),
            update: jest.fn().mockResolvedValue(empresaDtoMock),
            delete: jest.fn().mockResolvedValue(1),
          },
        },
      ],
    }).compile();

    empresaController = module.get<EmpresaController>(EmpresaController);
    empresaService = module.get<EmpresaService>(EmpresaService);
  });

  it('should be defined', () => {
    expect(empresaController).toBeDefined();
    expect(empresaService).toBeDefined();
  });

  describe('index', () => {
    it('should return a list index', async () => {
      const result = await empresaController.index();

      expect(result).toEqual(empresaListMock);
      expect(typeof result).toEqual('object');
      expect(empresaService.getAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(empresaService, 'getAll').mockRejectedValueOnce(new Error());

      expect(empresaController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should return a new created company', async () => {
      const result = await empresaController.create(empresaDtoMock);

      expect(result).toEqual(empresaDtoMock);
      expect(typeof result).toEqual('object');
      expect(empresaService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(empresaService, 'create').mockRejectedValueOnce(new Error());

      expect(empresaController.create(empresaDtoMock)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should return a updated company', async () => {
      const result = await empresaController.update(1, empresaDtoMock);

      expect(result).toEqual(empresaDtoMock);
      expect(typeof result).toEqual('object');
      expect(empresaService.update).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(empresaService, 'update').mockRejectedValueOnce(new Error());

      expect(
        empresaController.update(1, empresaDtoMock),
      ).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should delete the company by id', async () => {
      const result = await empresaController.destroy(1);

      expect(result).toBeUndefined();
      expect(empresaService.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(empresaService, 'delete').mockRejectedValueOnce(new Error());

      expect(empresaController.destroy(1)).rejects.toThrowError();
    });
  });
});
