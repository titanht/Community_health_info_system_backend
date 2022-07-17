const db = require('../connect/connect')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcrypt')
const authLogin = (req, res) => {
  const { email, password } = req.body
  const sql = 'SELECT * FROM login WHERE email= ?'
  const sqlInsertIntoRefreshTable = 'INSERT INTO refreshTokens SET ?'
  const sqlFindLoginIDInRefreshToken =
    'SELECT * FROM refreshTokens WHERE login_id=?'
  db.query(sql, email, async (err, result) => {
    if (err) throw err
    if (result == '') {
      res.status(404).json({
        msg: `user not found with email:${email}. retry or signUp`,
      })
    } else {
      const loginID = result[0].login_id
      try {
        let check = await bcrypt.compare(password, result[0].password)
        if (check) {
          const user = { userEmail: email }
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s',
          })
          db.query(sqlFindLoginIDInRefreshToken, loginID, (err, result) => {
            if (err) throw err
            if (result == '') {
              const refreshToken = jwt.sign(
                user,
                process.env.REFRESH_TOKEN_SECRET
              )
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
                    msg: 'user successfully logged in and refresh token saved to db',
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    refreshTokenData: RefreshTResult,
                  })
                }
              )
            } else {
              const refreshToken = result[0].refresh_token
              res.status(200).json({
                msg: 'user successfully logged in',
                access_token: accessToken,
                refresh_token: refreshToken,
              })
            }
          })
        } else {
          res.status(404).json({
            msg: 'invalid password try again!',
          })
        }
      } catch (error) {
        res.sendStatus(500)
        console.error(error)
      }
    }
  })
}
module.exports = { authLogin }
