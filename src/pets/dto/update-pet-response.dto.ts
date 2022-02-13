import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class updatePetResponse {
  @Field()
  response: string;
}
