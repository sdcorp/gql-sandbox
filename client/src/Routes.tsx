import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Header } from './Header'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
