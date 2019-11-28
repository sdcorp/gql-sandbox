import { Length, IsEmail } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import { IsUserAlreadyExist } from './isUserAlreadyExist';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  @IsUserAlreadyExist({ message: 'already taken' })
  email: string;

  @Field()
  @Length(8, 255)
  password: string;
}
