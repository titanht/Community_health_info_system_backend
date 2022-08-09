const db = require('../connect/connect')
const sqlFindLoginId = 'SELECT login_id FROM login WHERE email=?'
const sqlFindAndDeleteRefreshToken =
  'DELETE FROM refreshTokens WHERE login_id=?'
const logout = (req, res) => {
  const { email } = req.body
  db.query(sqlFindLoginId, email, (err, result) => {
    if (err) throw err
    if (result == '') return res.sendStatus(404)
    const loginID = result[0].login_id
    db.query(sqlFindAndDeleteRefreshToken, loginID, (err, RefResult) => {
      if (err) throw err
      if (RefResult == '') {
        return res.status(404).json({ msg: 'no refresh tokens' })
      } else {
        res.status(200).json({
          msg: 'user successfully logged out',
          status: 'true',
        })
      }
    })
  })
}
module.exports = { logout }
