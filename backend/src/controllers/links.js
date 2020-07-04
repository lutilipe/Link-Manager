const { Link } = require('../models')
const { getMessage } = require('../helpers/messages')

class Links {
  async index (req, res) {
    const { accountId } = req
    const links = await Link.findAll({ where: { accountId } })

    return res.jsonOK(links)
  }

  async show (req, res) {
    const { id } = req.params
    const { accountId } = req
    const link = await Link.findOne({ where: { id, accountId } })

    if (!link) {
      return res.jsonNotFound()
    }

    return res.jsonOK(link)
  }

  async update (req, res) {
    const { accountId, body } = req
    const { id } = req.params

    const link = await Link.findOne({ where: { id, accountId } })

    if (!link) {
      return res.jsonNotFound()
    }

    const fields = ['label', 'url', 'isSocial']
    fields.map(fieldName => {
      const newValue = body[fieldName]

      if (newValue !== undefined) {
        link[fieldName] = newValue
      }
    })

    await link.save()

    res.jsonOK(link, getMessage('account.link.success'))
  }

  async create (req, res) {
    const { body, accountId } = req
    const { label, url, isSocial } = body

    const image = 'https://google.com/image.jpg'

    const link = await Link.create({ label, url, isSocial, image, accountId })

    return res.jsonOK(link)
  }

  async destroy (req, res) {
    const { accountId } = req
    const { id } = req.params
    const link = await Link.findOne({ where: { id, accountId } })

    if (!link) {
      return res.jsonNotFound()
    }
    await link.destroy()

    res.jsonOK(link, getMessage('account.link.success.delete'))
  }
}

module.exports = Links
