import { Query, Resolver, Mutation, Arg, Authorized } from 'type-graphql';
import { Post } from '../entity/Post';

@Resolver()
export class PostResolver {
  @Authorized()
  @Query(() => String)
  getPost() {
    return 'my post!';
  }
  @Mutation(() => Boolean)
  async create(@Arg('title') title: string, @Arg('text') text: string) {
    await Post.create({ title, text }).save();
    return true;
  }
}
