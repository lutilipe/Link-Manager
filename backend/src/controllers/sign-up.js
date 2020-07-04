const { Account } = require('../models')
const bcrypt = require('bcrypt')
const { getMessage } = require('../helpers/messages')
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt')

const saltRounds = 10

class SignUp {
  async create (req, res) {
    const { email, password } = req.body

    const account = await Account.findOne({ where: { email } })
    if (account) {
      return res.jsonBadRequest(null, getMessage('account.signup.email_exists'))
    }

    const hash = bcrypt.hashSync(password, saltRounds)

    const newAccount = await Account.create({
      email,
      password: hash
    })

    const token = generateJwt({ id: newAccount.id })
    const refreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion })

    return res.jsonOK(newAccount, getMessage('account.signup.success'), { token, refreshToken })
  }
}

module.exports = SignUp
