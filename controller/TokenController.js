const jwt = require('jsonwebtoken')
const db = require('../connect/connect')

require('dotenv').config()
const regenerateAccessToken = (req, res) => {
  const { RefToken } = req.body
  const sqlFindRefreshToken =
    'SELECT refresh_token FROM refreshTokens WHERE refresh_token=?'
  db.query(sqlFindRefreshToken, RefToken, (err, result) => {
    if (err) throw err
    if (result == '') {
      res.sendStatus(403)
    } else {
      const refreshToken = result[0].refresh_token

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) throw err
          const accessToken = jwt.sign(
            { userEmail: user.userEmail },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: '20s',
            }
          )
          res.status(200).json({
            access_token: accessToken,
          })
        }
      )
    }
  })
}
module.exports = { regenerateAccessToken }
