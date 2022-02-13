import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class updatePetInput {
  @Field()
  @IsNotEmpty()
  @IsNumber()
  id:number

  @Field()
  @IsNotEmpty()
  petName: string;

  @Field()
  @IsNotEmpty()
  petColor: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
