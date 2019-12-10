import { Query, Resolver, Mutation, Arg, Int, UseMiddleware, Ctx } from 'type-graphql';
import { Post } from '../entity/Post';
import { PostUpdateInput, PostCreateInput } from './post/PostInput';
import { isAuth } from '../middleware/isAuth';
import { IContext } from '../types/Context';
import { User } from '../entity/User';

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async getPosts() {
    const posts = await Post.find({ relations: ['author'] });
    return posts;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Post)
  async create(@Arg('input') input: PostCreateInput, @Ctx() ctx: IContext) {
    const author = await User.findOne(ctx.userId);
    const newPost = await Post.create({ ...input, author }).save();
    return newPost;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async updatePost(@Arg('id', () => Int) id: number, @Arg('input') input: PostUpdateInput) {
    await Post.update({ id }, input);
    return true;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async delete(@Arg('id', () => Int) id: number) {
    const exists = await Post.findOne(id);
    if (!exists) {
      throw new Error('post not found');
    }
    await Post.delete(id);
    return true;
  }
}
