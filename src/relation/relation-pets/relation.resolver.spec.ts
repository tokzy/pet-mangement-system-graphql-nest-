import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../auth/entities/user.entity';
import { RelationService } from '../relation.service';
import { RelationResolver } from './relation.resolver';

jest.mock('../relation.service');

describe('RelationResolver', () => {
  let resolver: RelationResolver;
  let relationservice: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationResolver, RelationService],
    }).compile();

    resolver = module.get<RelationResolver>(RelationResolver);
    relationservice = module.get<RelationService>(RelationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('relation service should be injected', () => {
    expect(relationservice).toBeDefined();
  });

  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let getuser: User;
      beforeEach(async () => {
        getuser = await relationservice.getOneUser(expect.any(Number));
      });
      test('should be called with user Id', () => {
        expect(relationservice.getOneUser).toBeCalledWith(expect.any(Number));
      });

      test('it should return user object', () => {
        expect(getuser).toEqual({
          id: expect.any(Number),
          firstName: expect.any(String),
          lastName: expect.any(String),
          phone: expect.any(String),
          email: expect.any(String),
          imagePath: expect.any(String) || null,
        });
      });
    });
  });
});
