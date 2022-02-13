import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class deletePetResponse {
  @Field()
  response: string;
}
