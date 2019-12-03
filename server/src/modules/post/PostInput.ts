import { InputType, Field } from 'type-graphql';
import { Post } from '../../entity/Post';

@InputType()
export class PostUpdateInput implements Partial<Post> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  text?: string;
}
