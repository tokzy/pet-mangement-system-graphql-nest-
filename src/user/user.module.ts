import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports:[],
  providers: [UserResolver, UserService]
})
export class UserModule {}
