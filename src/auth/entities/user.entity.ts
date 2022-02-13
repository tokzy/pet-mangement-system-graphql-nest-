import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Pet } from '../../pets/entities/pet.entitiy';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  phone: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  imagePath?: string;

  @Column({ select: false })
  password?: string;

  @OneToMany(() => Pet, (pet) => pet.user)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];
}
