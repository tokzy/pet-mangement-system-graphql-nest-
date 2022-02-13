import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Pet } from './entities/pet.entitiy';
import { PetsResolver } from './pets.resolver';
import { PetsService } from './pets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), UserModule],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {}
