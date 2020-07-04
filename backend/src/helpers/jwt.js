require('dotenv').config()

const jwt = require('jsonwebtoken')

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY

const options = {
  expiresIn: '30 minutes'
}

const refreshOptions = {
  expiresIn: '30 days'
}

const generateJwt = paiload => {
  return jwt.sign(paiload, tokenPrivateKey, options)
}

const generateRefreshJwt = paiload => {
  return jwt.sign(paiload, refreshTokenPrivateKey, refreshOptions)
}

const verifyJwt = token => {
  return jwt.verify(token, tokenPrivateKey)
}

const verifyRefreshJwt = token => {
  return jwt.verify(token, refreshTokenPrivateKey)
}

const getTokenFromHeaders = headers => {
  const token = headers.authorization
  return token ? token.slice(7, token.length) : null
}

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt, getTokenFromHeaders }
