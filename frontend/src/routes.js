import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Links from './pages/Manager/Links'
import CreateLink from './pages/Manager/Links/Create'
import Edit from './pages/Manager/Links/Edit'
import Home from './pages/Home'

import { initAccount } from './actions/AccountActions'

const Routes = ({ initAccount }) => {
  useEffect(() => {
    initAccount()
  }, [initAccount])

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/sign-in'><SignIn /></Route>
        <Route path='/sign-up'><SignUp /></Route>
        <Route path='/manager/link/create'><CreateLink /></Route>
        <Route path='/manager/link/edit/:id'><Edit /></Route>
        <Route path='/manager/link'><Links /></Route>
        <Route path='/'><Home /></Route>
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = state => {
  return { account: state.account.account }
}

export default connect(mapStateToProps, { initAccount })(Routes)
