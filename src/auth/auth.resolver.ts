import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/logininput.dto';
import { LoginToken } from './dto/logintoken.dto';
import { RegInput } from './dto/register-input.dto';
import { RegResponse } from './dto/register-response.dto';
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

  @Mutation(() => RegResponse)
  @UseGuards(JwtAuthGuard)
  async RegisterUser(@Args('RegInput') RegInput: RegInput): Promise<any> {
    return this.authservice.Register(RegInput);
  }
}
