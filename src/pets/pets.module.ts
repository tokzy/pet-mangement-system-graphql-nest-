import { Module } from '@nestjs/common';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  providers: [PetsResolver, PetsService]
})
export class PetsModule {}
