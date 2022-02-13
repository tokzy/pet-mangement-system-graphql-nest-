import { UseGuards } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Pet } from 'src/pets/entities/pet.entitiy';
import { User } from '../../auth/entities/user.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RelationService } from '../relation.service';

@Resolver((of) => User)
export class RelationUserResolver {
  constructor(private readonly relationUserService: RelationService) {}

  @ResolveField(() => [Pet])
  @UseGuards(JwtAuthGuard)
  async pets(@Parent() user: User): Promise<Pet[]> {
    return await this.relationUserService.pets(user.id);
  }
}
