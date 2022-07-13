const authLogin = (email, password) => {
  const sql = 'SELECT * FROM login WHERE email= ?'
  let query = db.query(sql, email, async (err, result) => {
    if (err) throw err
    try {
      let check = await bcrypt.compare(password, result[0].userPassword)
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
