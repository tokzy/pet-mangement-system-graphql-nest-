import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginToken {
  @Field()
  accessToken: string;
}
