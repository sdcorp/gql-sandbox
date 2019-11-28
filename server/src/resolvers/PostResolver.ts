import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Post } from '../entity/Post';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getPosts() {
    const posts = await Post.find();
    return posts;
  }
  @Mutation(() => Boolean)
  async create(@Arg('title') title: string, @Arg('text') text: string) {
    await Post.create({ title, text }).save();
    return true;
  }
}
