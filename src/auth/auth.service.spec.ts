import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

jest.mock('./auth.service');

describe('AuthService', () => {
  let service: AuthService;

  let userRepository = jest.fn().mockReturnValue({});

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
        {
          provide: JwtService,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: GqlAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
        {
          provide: JwtAuthGuard,
          useValue: jest.fn().mockImplementation(() => true),
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('hashPassword', () => {
    describe('when hashpassword is called', () => {
      let hashpass: string;

      beforeEach(async () => {
        hashpass = await service.hashPassword('test205');
      });

      test('it should be called with', () => {
        expect(service.hashPassword).toBeCalledWith(expect.any(String));
      });

      test('it should return hashed password', () => {
        expect(hashpass).toEqual(expect.any(String));
      });
    });
  });
});
