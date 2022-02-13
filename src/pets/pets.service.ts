import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet-input.dto';
import { Pet } from './entities/pet.entitiy';
import { isEmpty } from 'lodash';
import { UserService } from '../user/user.service';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private readonly petRepository: Repository<Pet>,
    private readonly userService: UserService,
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

  public async getOneUser(userId:number):Promise<User>{
     return this.userService.getOneUser(userId); 
  }

 public async getAllPets():Promise<Pet[]>{
 return await this.petRepository.find();
 } 

public async getSinglePet(petId: number):Promise<Pet>{
    return await this.petRepository.findOne(petId);
}

}
