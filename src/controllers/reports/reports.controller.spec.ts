import { Test, TestingModule } from '@nestjs/testing';
import { ReportsSummaryPerHourDto } from 'src/shared/dtos/reports/reports.perHour.dto';
import { EstacionamentoService } from '../../core/services/estacionamento.service';
import { ReportsSummaryDto } from '../../shared/dtos/reports/reports.summary.dto';
import { ReportsController } from './reports.controller';

const reportSummaryDtoMock: ReportsSummaryDto = {
  totalCarros: 10,
  totalMotos: 10,
  totalEntradaSaida: 5,
  totalNaoFinalizados: 2,
};

const reportsSummaryPerHourDtoMock: ReportsSummaryPerHourDto = {
  horaInicial: '12',
  horaFinal: '21',
};

describe('ReportsController', () => {
  let reportsController: ReportsController;
  let estacionamentoService: EstacionamentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: EstacionamentoService,
          useValue: {
            entradaSaidaReport: jest
              .fn()
              .mockResolvedValue(reportSummaryDtoMock),
          },
        },
      ],
    }).compile();

    reportsController = module.get<ReportsController>(ReportsController);
    estacionamentoService = module.get<EstacionamentoService>(
      EstacionamentoService,
    );
  });

  it('should be defined', () => {
    expect(reportsController).toBeDefined();
    expect(estacionamentoService).toBeDefined();
  });

  describe('qtdEntradaSaidaVeiculos', () => {
    it('should return a report of quantity of enter and left vehicles', async () => {
      const result = await reportsController.qtdEntradaSaidaVeiculos();

      expect(result).toEqual(reportSummaryDtoMock);
      expect(typeof result).toEqual('object');
      expect(estacionamentoService.entradaSaidaReport).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(estacionamentoService, 'entradaSaidaReport')
        .mockRejectedValueOnce(new Error());

      expect(
        reportsController.qtdEntradaSaidaVeiculos(),
      ).rejects.toThrowError();
    });
  });

  describe('qtdEntradaSaidaVeiculosPorHora', () => {
    it('should return a report of quantity of enter and left vehicles per hour', async () => {
      const result = await reportsController.qtdEntradaSaidaVeiculosPorHora(
        reportsSummaryPerHourDtoMock,
      );

      expect(result).toEqual(reportSummaryDtoMock);
      expect(typeof result).toEqual('object');
      expect(estacionamentoService.entradaSaidaReport).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(estacionamentoService, 'entradaSaidaReport')
        .mockRejectedValueOnce(new Error());

      expect(
        reportsController.qtdEntradaSaidaVeiculosPorHora(
          reportsSummaryPerHourDtoMock,
        ),
      ).rejects.toThrowError();
    });
  });
});
