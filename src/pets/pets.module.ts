import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entitiy';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  imports:[TypeOrmModule.forFeature([Pet])],
  providers: [PetsResolver, PetsService]
})
export class PetsModule {}
