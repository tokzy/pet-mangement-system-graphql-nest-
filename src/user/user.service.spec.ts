import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockImplementation(() => true),
            update: jest.fn().mockImplementation(() => true),
            delete: jest.fn().mockImplementation(() => true),
            findOne: jest.fn().mockImplementation(() => true),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
});
