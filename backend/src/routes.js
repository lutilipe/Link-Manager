const express = require('express')
const SignUp = require('./controllers/sign-up')
const SignIn = require('./controllers/sign-in')
const Links = require('./controllers/links')
const RefreshToken = require('./controllers/refreshToken')
const { accountSignUp, accountSignIn } = require('./validators/account')

const routes = express.Router()

const signIn = new SignIn()
routes.post('/sign-in', accountSignIn, signIn.index)

const signUp = new SignUp()
routes.post('/sign-up', accountSignUp, signUp.create)

const refreshToken = new RefreshToken()
routes.post('/refresh', refreshToken.index)

const links = new Links()
routes.get('/link/', links.index)
routes.get('/link/:id', links.show)
routes.post('/link', links.create)
routes.put('/link/:id', links.update)
routes.delete('/link/:id', links.destroy)

module.exports = routes
