import { Resolver } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { RelationService } from '../relation.service';

@Resolver((of) => User)
export class RelationUserResolver {
  constructor(private readonly relationUserService:RelationService){}  

  
}
