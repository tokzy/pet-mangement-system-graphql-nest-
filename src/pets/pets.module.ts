import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entitiy';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetsResolver, PetsService],
  exports: [PetsService],
})
export class PetsModule {}
