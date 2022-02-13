import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePetInput } from './dto/create-pet-input.dto';
import { Pet } from './entities/pet.entitiy';
import { PetsService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private readonly petService:PetsService){}  

@Mutation(() => Pet)
@UseGuards(JwtAuthGuard)
async CreatePet(@Args("CreatePetInput") CreatePetInput: CreatePetInput):Promise<Pet>{
return this.petService.CreatePets(CreatePetInput);
}


}
