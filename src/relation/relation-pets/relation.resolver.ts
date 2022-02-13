import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../../auth/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Pet } from '../../pets/entities/pet.entitiy';
import { RelationService } from '../relation.service';

@Resolver((of) => Pet)
export class RelationResolver {
  constructor(private readonly relationService: RelationService) {}

  @ResolveField(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Parent() pet: Pet): Promise<User> {
    return await this.relationService.getOneUser(pet.userId);
  }
}
