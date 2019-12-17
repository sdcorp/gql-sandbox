import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Mutation = {
   __typename?: 'Mutation',
  register: User,
  login?: Maybe<User>,
  logout: Scalars['Boolean'],
  create: Post,
  updatePost: Scalars['Boolean'],
  delete: Scalars['Boolean'],
};


export type MutationRegisterArgs = {
  userinput: UserInput
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationCreateArgs = {
  input: PostCreateInput
};


export type MutationUpdatePostArgs = {
  input: PostUpdateInput,
  id: Scalars['Int']
};


export type MutationDeleteArgs = {
  id: Scalars['Int']
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  text: Scalars['String'],
  createdAt: Scalars['String'],
  updatedAt: Scalars['String'],
  author?: Maybe<User>,
};

export type PostCreateInput = {
  title: Scalars['String'],
  text: Scalars['String'],
};

export type PostUpdateInput = {
  title?: Maybe<Scalars['String']>,
  text?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  hello: Scalars['String'],
  me: User,
  getPosts: Array<Post>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email: Scalars['String'],
  posts?: Maybe<Array<Post>>,
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
};

export type PostsQueryVariables = {};


export type PostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'text' | 'createdAt' | 'updatedAt'>
  )> }
);


export const PostsDocument = gql`
    query Posts {
  getPosts {
    id
    title
    text
    createdAt
    updatedAt
  }
}
    `;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        return ApolloReactHooks.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
      }
export function usePostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, baseOptions);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = ApolloReactCommon.QueryResult<PostsQuery, PostsQueryVariables>;