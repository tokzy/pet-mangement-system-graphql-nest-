import { Injectable } from '@nestjs/common';
import { Pet } from '../pets/entities/pet.entitiy';
import { User } from '../auth/entities/user.entity';
import { PetsService } from '../pets/pets.service';
import { UserService } from '../user/user.service';

@Injectable()
export class RelationService {
  constructor(
    private readonly userService: UserService,
    private readonly petService: PetsService,
  ) {}

  public async getOneUser(userId: number): Promise<User> {
    return this.userService.getOneUser(userId);
  }

  public async pets(userId: number): Promise<Pet[]> {
    return this.petService.getAllPetsPerUser(userId);
  }
}
