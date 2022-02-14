import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { LoginToken } from './dto/logintoken.dto';
import { mockLoginInput } from './dto/stub/login-input.mock.dto';
import { GqlAuthGuard } from './guards/gql-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { mockLoginResponse } from './dto/stub/login-response.mock.dto';
import { User } from './entities/user.entity';
import { mockRegInput } from './dto/stub/register-input.mock.dto';
import { mockRegResponse } from './dto/stub/register-response.mock.dto';

jest.mock('./auth.service');

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authservice: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthResolver,
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

    resolver = module.get<AuthResolver>(AuthResolver);
    authservice = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('Login', () => {
    describe('when login is called', () => {
      let userlog: LoginToken;

      beforeEach(async () => {
        userlog = await resolver.Login(mockLoginInput());
      });

      test('then it should call authservice', () => {
        expect(authservice.login).toBeCalledWith(mockLoginInput());
      });

      test('then it should return login token', () => {
        expect(userlog).toEqual(mockLoginResponse());
      });
    });
  });

  describe('RegisterUser', () => {
    describe('when RegisterUser is called', () => {
      let userReg: User;

      beforeEach(async () => {
        userReg = await resolver.RegisterUser(mockRegInput());
      });

      test('then it should call authservice', () => {
        expect(authservice.Register).toBeCalledWith(mockRegInput());
      });

      test('it should return new registered user object', () => {
        expect(userReg).toEqual(mockRegResponse());
      });
    });
  });
});
