const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const db = require('./models/index')
const response = require('./middleware/response')
const checkJwt = require('./middleware/jwt')

const app = express()

app.use(cors())
app.use(response)
app.use(checkJwt)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(routes)

db.sequelize.sync().then(() => {
  app.listen(3333, () => {
    console.log('Server executando na porta 3333')
  })
})
