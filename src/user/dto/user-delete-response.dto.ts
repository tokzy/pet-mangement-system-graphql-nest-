import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deleteResponse {
  @Field()
  response: string;
}
