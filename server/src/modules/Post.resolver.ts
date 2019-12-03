import { Query, Resolver, Mutation, Arg, Int } from 'type-graphql';
import { Post } from '../entity/Post';
import { PostUpdateInput } from './post/PostInput';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getPosts() {
    const posts = await Post.find();
    return posts;
  }

  @Mutation(() => Post)
  async create(@Arg('title') title: string, @Arg('text') text: string) {
    const newPost = await Post.create({ title, text }).save();
    return newPost;
  }

  @Mutation(() => Boolean)
  async updatePost(@Arg('id', () => Int) id: number, @Arg('input') input: PostUpdateInput) {
    await Post.update({ id }, input);
    return true;
  }

  @Mutation(() => Boolean)
  async delete(@Arg('id', () => Int) id: number) {
    await Post.delete(id);
    return true;
  }
}
