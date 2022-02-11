import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/logininput.dto';
import { LoginToken } from './dto/logintoken.dto';
import { User } from './entities/user.entity';
import { GqlAuthGuard } from './guards/gql-auth.guards';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authservice: AuthService) {}

  @Mutation(() => LoginToken)
  @UseGuards(GqlAuthGuard)
  async Login(@Args('LoginInput') LoginInput: LoginInput): Promise<LoginToken> {
    return this.authservice.login(LoginInput);
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return this.authservice.getAllUsers();
  }
}
