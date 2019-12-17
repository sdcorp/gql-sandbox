import React from 'react'
import './App.css'
import { useQuery, gql } from '@apollo/client'

const GET_POSTS = gql`
  {
    getPosts {
      id
      title
      text
      createdAt
      updatedAt
    }
  }
`

const App: React.FC = () => {
  const { data, loading, error } = useQuery(GET_POSTS)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  console.log(data.getPosts)
  return (
    <div className="App">
      <h1>React</h1>
      {data.getPosts.map((p: any) => p.text)}
    </div>
  )
}

export default App
