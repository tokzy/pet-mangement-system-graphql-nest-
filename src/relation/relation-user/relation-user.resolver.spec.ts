import { Test, TestingModule } from '@nestjs/testing';
import { RelationUserResolver } from './relation-user.resolver';

describe('RelationUserResolver', () => {
  let resolver: RelationUserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelationUserResolver],
    }).compile();

    resolver = module.get<RelationUserResolver>(RelationUserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
