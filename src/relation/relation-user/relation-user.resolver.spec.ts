import { Test, TestingModule } from '@nestjs/testing';
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
  
  it('relation service should be defined',() => {
   expect(relationservice).toBeDefined(); 
  });

  
});
