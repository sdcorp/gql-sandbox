import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';

@ObjectType()
@Entity({ name: 'posts' })
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  text: string;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(
    () => User,
    user => user.posts
  )
  author: User;
}
