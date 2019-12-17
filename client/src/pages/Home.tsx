import React from 'react'
import { usePostsQuery } from '../generated/graphql'

export const Home: React.FC = () => {
  const { data, loading, error } = usePostsQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <div className="App">
      <h1>Posts</h1>
      {data?.getPosts.map(p => p.text)}
    </div>
  )
}
