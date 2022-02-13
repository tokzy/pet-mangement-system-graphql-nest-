import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('pets')
export class Pet {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  petName: string;

  @Field({nullable:true})
  @Column({nullable:true})
  petColor: string;

  @Field(() => Int)
  @Column()
  userId: number

  @ManyToOne(() => User,user => user.pets)
  @Field(() => User,{nullable:true})
  user?:User
}
