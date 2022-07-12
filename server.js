const express = require('express')
const db = require('./connect/connect')
const { router } = require('./routers/userAuthRoutes')
const app = express()
const port = 4000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/v1', router)

const start = () => {
  try {
    db.connect((err) => {
      if (err) {
        throw err
      }
      console.log('connected to mysqlDb')
    })
    app.listen(port, () => {
      console.log(`server is listening to port: ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
