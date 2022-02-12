import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class UserDeleteInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
