import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { deleteResponse } from '../user/dto/user-delete-response.dto';
import { UpdateResponse } from '../user/dto/user-update-response';
import { CreatePetInput } from './dto/create-pet-input.dto';
import { deletePetResponse } from './dto/delete-pet-response.dto';
import { updatePetInput } from './dto/update-pet-input.dto';
import { updatePetResponse } from './dto/update-pet-response.dto';
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

  @Mutation(() => updatePetResponse)
  @UseGuards(JwtAuthGuard)
  async updatePets(
    @Args('updatePetInput') updatePetInput: updatePetInput,
  ): Promise<UpdateResponse> {
    return this.petService.updatePets(updatePetInput);
  }

  @Mutation(() => deletePetResponse)
  @UseGuards(JwtAuthGuard)
  async deletePets(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<deleteResponse> {
    return this.petService.deletePets(id);
  }
}
