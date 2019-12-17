import React, { useState } from 'react'
import { useLoginMutation } from '../generated/graphql'
import { useHistory } from 'react-router-dom'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let history = useHistory()
  const [login] = useLoginMutation({
    variables: { email, password },
  })
  return (
    <div>
      <form
        onSubmit={async e => {
          e.preventDefault()
          const res = await login()
          const user = res.data?.login
          if (!user) {
            alert('Invalid auth')
            return
          }
          alert(JSON.stringify(user, null, 2))
          history.push('/')
        }}
      >
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
