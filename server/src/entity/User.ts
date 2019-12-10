import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Post } from './Post';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => [Post], { nullable: true })
  @OneToMany(
    () => Post,
    post => post.author
  )
  posts: Post[];
}
