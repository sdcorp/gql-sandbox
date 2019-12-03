import 'reflect-metadata';
import { createConnection, getConnectionOptions } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './utils/redis';
import { customAuthChecker } from './middleware/authChecker';

(async () => {
  const app = express();

  const RedisStore = connectRedis(session);

  app.set('trust proxy', 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.NODE_ENV === 'production' ? 'https://www.mysite.com' : 'http://localhost:3000',
    })
  );

  const sessionOption: session.SessionOptions = {
    store: new RedisStore({
      client: redis,
    }),
    name: 'qid',
    secret: 'some_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    },
  };

  app.use(session(sessionOption));

  const options = await getConnectionOptions(process.env.NODE_ENV || 'development');

  await createConnection({ ...options, name: 'default' });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [__dirname + '/modules/*.resolver.ts'],
      validate: true,
      authChecker: customAuthChecker,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
