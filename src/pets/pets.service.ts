import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet-input.dto';
import { Pet } from './entities/pet.entitiy';
import { isEmpty } from 'lodash';
import { updatePetInput } from './dto/update-pet-input.dto';
import { updatePetResponse } from './dto/update-pet-response.dto';
import { deletePetResponse } from './dto/delete-pet-response.dto';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
  ) {}

  public async checkIfPetExists(petName: string): Promise<boolean> {
    return await this.petRepository
      .findOne({ petName: petName })
      .then((res) => {
        if (!isEmpty(res)) {
          return true;
        }
        return false;
      });
  }

  public async CreatePets(CreatePetInput: CreatePetInput): Promise<Pet> {
    const { petName } = CreatePetInput;
    return await this.checkIfPetExists(petName).then(async (res) => {
      if (res == true) {
        throw new HttpException('Pets Already Exists', HttpStatus.BAD_REQUEST);
      } else {
        return await this.petRepository.save(CreatePetInput);
      }
    });
  }

  public async getAllPets(): Promise<Pet[]> {
    return await this.petRepository.find();
  }

  public async getAllPetsPerUser(userId: number): Promise<Pet[]> {
    return await this.petRepository.find({ userId: userId });
  }

  public async getSinglePet(petId: number): Promise<Pet> {
    return await this.petRepository.findOne(petId);
  }

  public async updatePets(
    updatePetInput: updatePetInput,
  ): Promise<updatePetResponse> {
    const { id, userId, petName, petColor } = updatePetInput;
    return await this.petRepository
      .update(id, { userId: userId, petName: petName, petColor })
      .then((res) => {
        if (res) {
          return { response: 'success' };
        } else {
          return { response: 'update failed' };
        }
      })
      .catch((err) => {
        throw new HttpException(
          err,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

public async deletePets(petId:number):Promise<deletePetResponse>{
 return this.petRepository.delete(petId).then((res) => {
   if(res){
    return {response:"success"} 
   }else{
     return {response:"delete failed"}
   }
 }).catch((err) => {
  throw new HttpException(err,HttpStatus.INTERNAL_SERVER_ERROR); 
 }) 
}

}
