const { getTokenFromHeaders } = require('../helpers/jwt')
const { Account } = require('../models')
const { generateJwt, verifyRefreshJwt } = require('../helpers/jwt')

class RefreshToken {
  async index (req, res) {
    const token = getTokenFromHeaders(req.headers)

    if (!token) {
      return res.jsonUnauthorized(null, 'Invalid Token')
    }

    try {
      const decoded = verifyRefreshJwt(token)
      const account = await Account.findByPk(decoded.id)
      if (!account) {
        return res.jsonUnauthorized(null, 'Invalid Token')
      }
      if (decoded.version !== account.jwtVersion) {
        return res.jsonUnauthorized(null, 'Invalid Token')
      }

      const meta = {
        token: generateJwt({ id: account.id })
      }

      return res.jsonOK(null, null, meta)
    } catch (e) {
      return res.jsonUnauthorized(null, 'Invalid Token')
    }
  }
}

module.exports = RefreshToken
