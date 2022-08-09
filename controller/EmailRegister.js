const db = require('../connect/connect')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const EmailRegister = (req, res, next) => {
  const { email, password } = req.body
  const sqlSearchUserEmail = 'SELECT * FROM login where email=?'
  const sqlInsertIntoLogin = 'INSERT INTO login SET ?'
  const sqlInsertIntoRefreshTable = 'INSERT INTO refreshTokens SET ?'
  db.query(sqlSearchUserEmail, email, async (err, result) => {
    if (err) throw err
    if (result == '') {
      let hashedPassword = await bcrypt.hash(password, 10)
      const loginData = { email, password: hashedPassword }
      const user = { userEmail: email }
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '86400s',
      })

      db.query(sqlInsertIntoLogin, loginData, (err, signupResult) => {
        if (err) throw err
        const loginID = signupResult.insertId
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        const refreshTokenData = {
          login_id: loginID,
          refresh_token: refreshToken,
        }
        db.query(
          sqlInsertIntoRefreshTable,
          refreshTokenData,
          (err, RefreshTResult) => {
            if (err) throw err
            res.status(200).json({
              msg: 'user successfully registered',
              access_token: accessToken,
              refresh_token: refreshToken,
              userEmail: email,
              status: 'true',
            })
          }
        )
      })
    } else {
      res.status(404).json({
        msg: 'user already registered',
        status: 'false',
      })
    }
  })
}

module.exports = {
  EmailRegister,
}
