import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RegResponse {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  imagePath?: string;
}
