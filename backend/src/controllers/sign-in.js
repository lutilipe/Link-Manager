const { Account } = require('../models')
const bcrypt = require('bcrypt')
const { getMessage } = require('../helpers/messages')
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt')

class SignIn {
  async index (req, res) {
    const { email, password } = req.body

    const account = await Account.findOne({ where: { email } })

    const match = account ? bcrypt.compareSync(password, account.password) : null
    if (!match) {
      res.jsonBadRequest(null, getMessage('account.signin.invalid'))
    }

    const token = generateJwt({ id: account.id })
    const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion })

    return res.jsonOK(account, getMessage('account.signin.success'), { token, refreshToken })
  }
}

module.exports = SignIn
