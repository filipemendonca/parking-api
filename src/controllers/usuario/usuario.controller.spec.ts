import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioEntity } from 'src/core/domain/entities/usuario.entity';
import { UsuarioDto } from 'src/shared/dtos/usuario/usuario.dto';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioController } from './usuario.controller';

const usuarioListMock: UsuarioEntity[] = [
  {
    id: 1,
    username: 'user1',
    password: '123',
  },
  { id: 2, username: 'user2', password: '321' },
];

const usuarioDtoMock: UsuarioDto = {
  username: 'user1',
  password: '123',
};

describe('UsuarioController', () => {
  let usuarioController: UsuarioController;
  let usuarioService: UsuarioService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: {
            getById: jest.fn().mockResolvedValue(1),
            getOne: jest.fn().mockResolvedValue('name'),
            getAll: jest.fn().mockResolvedValue(usuarioListMock),
            create: jest.fn().mockResolvedValue(usuarioDtoMock),
            update: jest.fn().mockResolvedValue(usuarioDtoMock),
            delete: jest.fn().mockResolvedValue(1),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validarUsuario: jest.fn().mockResolvedValue(usuarioDtoMock),
            login: jest.fn().mockResolvedValue(usuarioDtoMock),
          },
        },
      ],
    }).compile();

    usuarioController = module.get<UsuarioController>(UsuarioController);
    usuarioService = module.get<UsuarioService>(UsuarioService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(usuarioController).toBeDefined();
    expect(usuarioService).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('create', () => {
    it('should return a new created user', async () => {
      const result = await usuarioController.create(usuarioDtoMock);

      expect(result).toEqual(usuarioDtoMock);
      expect(typeof result).toEqual('object');
      expect(usuarioService.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usuarioService, 'create').mockRejectedValueOnce(new Error());

      expect(usuarioController.create(usuarioDtoMock)).rejects.toThrowError();
    });
  });

  describe('login', () => {
    it('should return a logged user with access_tolen', async () => {
      const result = await usuarioController.login(usuarioDtoMock);

      expect(result).toEqual(result);
      expect(typeof result).toEqual('object');
      expect(authService.login).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      expect(authService.login(usuarioDtoMock)).rejects.toThrowError();
    });
  });
});
