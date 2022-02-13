import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../auth/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDeleteInput } from './dto/user-delete-input.dto';
import { deleteResponse } from './dto/user-delete-response.dto';
import { UserUpdateInput } from './dto/user-update-input.dto';
import { UpdateResponse } from './dto/user-update-response';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Mutation(() => UpdateResponse)
  @UseGuards(JwtAuthGuard)
  async UpdateUser(
    @Args('UserUpdateInput') UserUpdateInput: UserUpdateInput,
  ): Promise<UpdateResponse> {
    return await this.userService.UpdateUsers(UserUpdateInput);
  }

  @Mutation(() => deleteResponse)
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args('UserdeleteInput') UserdeleteInput: UserDeleteInput,
  ): Promise<deleteResponse> {
    return await this.userService.deleteUser(UserdeleteInput);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getOneUser(@Args('id',{type: () => Int})id :number):Promise<User>{
   return await this.userService.getOneUser(id); 
  }
}
