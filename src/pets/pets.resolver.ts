import { Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entitiy';

@Resolver()
export class PetsResolver {
  constructor(@InjectRepository(Pet) private readonly petRepository:Repository<Pet>){}  


  
}
