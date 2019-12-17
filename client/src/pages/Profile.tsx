import React from 'react'
import { useMeQuery } from '../generated/graphql'
import { Link } from 'react-router-dom'

export const Profile: React.FC = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: 'network-only' })
  if (loading) return <p>Loading...</p>
  const u = data?.me
  return (
    <div>
      <h2>Profile</h2>
      <Link to="/">Go to Home</Link>
      <p>ID: {u?.id}</p>
      <p>Email: {u?.email}</p>
    </div>
  )
}
