import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationResolver } from './relation-pets/relation.resolver';
import { UserModule } from '../user/user.module';
import { PetsModule } from '../pets/pets.module';
import { RelationUserResolver } from './relation-user/relation-user.resolver';

@Module({
  imports: [UserModule, PetsModule],
  providers: [RelationService, RelationResolver, RelationUserResolver],
})
export class RelationModule {}
