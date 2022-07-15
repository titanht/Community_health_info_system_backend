const db = require('../connect/connect')
const bcrypt = require('bcrypt')
const authLogin = (req, res) => {
  const { email, password } = req.body
  const sql = 'SELECT * FROM login WHERE email= ?'
  db.query(sql, email, async (err, result) => {
    if (err) throw err
    try {
      console.log(result[0].password)
      let check = await bcrypt.compare(password, result[0].password)
      if (check) {
        res.status(200).json({
          msg: 'user logged in success',
        })
      } else {
        res.status(404).json({
          msg: 'invalid password try again!',
        })
      }
    } catch (error) {
      console.error(error)
    }
  })
}
module.exports = { authLogin }
