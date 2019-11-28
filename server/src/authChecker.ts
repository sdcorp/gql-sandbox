import { AuthChecker } from 'type-graphql';
import { UserContext } from './resolvers/user/userContext';

export const customAuthChecker: AuthChecker<UserContext> = ({ context }) => {
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  return !!context.req.session!.userId;
};
