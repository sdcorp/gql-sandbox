import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery } from './generated/graphql'

// ? Header doesn't re-render after redirect from success auth

export const Header: React.FC = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <header>Header</header>
      {data?.me ? (
        <Link to="/profile">Profile</Link>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
        </nav>
      )}
    </div>
  )
}
