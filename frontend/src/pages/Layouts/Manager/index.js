import React from 'react'
import { connect } from 'react-redux'
import { signOut } from '../../../actions/AccountActions'
import { Redirect, useHistory } from 'react-router-dom'

const Layout = ({ children, signOut, account }) => {
  const history = useHistory()

  const signOutHandler = e => {
    e.preventDefault()

    signOut()
  }

  const backHandler = e => {
    e.preventDefault()

    history.push('/manager/link')
  }

  if (!account) {
    return <Redirect to="/sign-in"/>
  }

  return (
    <div className="layout">
      <nav className="navbar navbar-expand-lg bg-primary text-light">
        <div className="container d-flex w-100 justify-content-between">
          <div>
          <button className="btn btn-clear" onClick={backHandler}>Back</button>
          </div>
          <dir className="text-center">
            <strong>Links</strong>
          </dir>
          <div>
            <button className="btn btn-clear" onClick={signOutHandler}>Exit</button>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    account: state.account.account
  }
}

export default connect(mapStateToProps, { signOut })(Layout)
