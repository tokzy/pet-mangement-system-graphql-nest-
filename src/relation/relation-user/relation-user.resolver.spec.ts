import { Test, TestingModule } from '@nestjs/testing';
import { Pet } from 'src/pets/entities/pet.entitiy';
import { RelationService } from '../relation.service';
import { RelationUserResolver } from './relation-user.resolver';

jest.mock('../relation.service');

describe('RelationUserResolver', () => {
  let resolver: RelationUserResolver;
  let relationservice: RelationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationUserResolver, RelationService],
    }).compile();

    resolver = module.get<RelationUserResolver>(RelationUserResolver);
    relationservice = module.get<RelationService>(RelationService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('relation service should be defined', () => {
    expect(relationservice).toBeDefined();
  });

  describe('pets', () => {
    describe('when pets is called', () => {
      let pets: Pet[];
      beforeEach(async () => {
        pets = await relationservice.pets(expect.any(Number));
      });

      test('it should be called with user Id', () => {
        expect(relationservice.pets).toBeCalledWith(expect.any(Number));
      });

      test('it should return an array of pets', () => {
        expect(pets).toEqual(expect.any(Array));
      });
    });
  });
});
