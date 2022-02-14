import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { LoginToken } from './dto/logintoken.dto';
import { mockLoginInput } from './dto/stub/login-input.mock.dto';
import { mockLoginResponse } from './dto/stub/login-response.mock.dto';
import { mockUserInput } from './dto/stub/user-input.dto';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

jest.mock('./auth.service');

describe('AuthService', () => {
  let service: AuthService;

  const userRepository = jest.fn().mockReturnValue({
    findOne: jest.fn().mockResolvedValue(mockUserInput()),
  });

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

      test('it should be called with password', () => {
        expect(service.hashPassword).toBeCalledWith(expect.any(String));
      });

      test('it should return hashed password', () => {
        expect(hashpass).toEqual(expect.any(String));
      });
    });
  });

  describe('Login', () => {
    describe('when login is called', () => {
      let userLogin: LoginToken;

      beforeEach(async () => {
        userLogin = await service.login(mockLoginInput());
      });

      test('it should be called with phone and password', () => {
        expect(service.login).toBeCalledWith(mockLoginInput());
      });

      test('it should return user', () => {
        expect(userLogin).toEqual(mockLoginResponse());
      });
    });
  });

  describe('validateUser', () => {
    describe('when validateUser is called', () => {
      let validateUser: User;
      beforeEach(async () => {
        validateUser = await service.validateUser(
          mockLoginInput().phone,
          mockLoginInput().password,
        );
      });

      test('it should be called with phone and password', () => {
        expect(service.validateUser).toBeCalledWith(
          mockLoginInput().phone,
          mockLoginInput().password,
        );
      });

      test('it should return user object', () => {
        expect(validateUser).toEqual(mockUserInput());
      });
    });
  });
});
