import { Module } from '@nestjs/common';
import { RelationService } from './relation.service';
import { RelationResolver } from './relation.resolver';
import { UserModule } from 'src/user/user.module';
import { PetsModule } from 'src/pets/pets.module';

@Module({
  imports: [UserModule, PetsModule],
  providers: [RelationService, RelationResolver],
})
export class RelationModule {}
