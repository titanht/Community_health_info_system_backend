const db = require('../connect/connect')
const bcrypt = require('bcrypt')
const EmailRegister = (req, res, next) => {
  const { email, password } = req.body
  const sqlSearchUserEmail = 'SELECT * FROM login where email=?'
  const sqlInsertIntoLogin = 'INSERT INTO login SET ?'
  const userSearchQuery = db.query(
    sqlSearchUserEmail,
    email,
    async (err, result) => {
      if (err) throw err
      if (result == '') {
        let hashedPassword = await bcrypt.hash(password, 10)
        const loginData = { email, password: hashedPassword }
        const insertUser = db.query(
          sqlInsertIntoLogin,
          loginData,
          (err, result) => {
            if (err) throw err
            res.status(200).json({
              msg: 'user registered',
              data: result,
            })
          }
        )
      } else {
        res.status(200).json({
          msg: 'user already registered',
        })
      }
    }
  )
}

module.exports = {
  EmailRegister,
}
