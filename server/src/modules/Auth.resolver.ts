import { Query, Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { UserInput } from './auth/Userinput';
import { User } from '../entity/User';
import { IContext } from '../types/Context';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi!';
  }

  @Query(() => User)
  async me(@Ctx() ctx: IContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) {
      return;
    }
    return User.findOne(ctx.req.session!.userId);
  }

  @Mutation(() => User)
  async register(@Arg('userinput') { email, password }: UserInput): Promise<User> {
    const hashedpassword = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashedpassword }).save();
    return user;
  }

  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: IContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: IContext): Promise<Boolean> {
    return new Promise((res, rej) =>
      ctx.req.session!.destroy(err => {
        if (err) return rej(false);
        ctx.res.clearCookie('qid');
        return res(true);
      })
    );
  }
}
