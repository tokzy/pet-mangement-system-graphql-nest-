import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Parent, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreatePetInput } from './dto/create-pet-input.dto';
import { Pet } from './entities/pet.entitiy';
import { PetsService } from './pets.service';

@Resolver((of) => Pet)
export class PetsResolver {
  constructor(private readonly petService: PetsService) {}

  @Mutation(() => Pet)
  @UseGuards(JwtAuthGuard)
  async CreatePet(
    @Args('CreatePetInput') CreatePetInput: CreatePetInput,
  ): Promise<Pet> {
    return await this.petService.CreatePets(CreatePetInput);
  }

  @Query(() => [Pet])
  @UseGuards(JwtAuthGuard)
  async getAllPets(): Promise<Pet[]> {
    return this.petService.getAllPets();
  }

  @Query(() => Pet)
  @UseGuards(JwtAuthGuard)
  async getOnePet(@Args('id', { type: () => Int }) id: number): Promise<Pet> {
    return await this.petService.getSinglePet(id);
  }
}
