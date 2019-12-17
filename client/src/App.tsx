import React from 'react'
import './App.css'
import { usePostsQuery } from './generated/graphql'
import { Login } from './pages/Login'

const App: React.FC = () => {
  const { data, loading, error } = usePostsQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  return (
    <div className="App">
      <h1>React</h1>
      {data?.getPosts.map(p => p.text)}
      <Login />
    </div>
  )
}

export default App
