const bcypt = require('bcrypt')
const {
  DrEmailRegister,
  DrAdrress,
  DrFullRegistration,
} = require('../util/authFunctions')
const signUpDoctor = (req, res, next) => {
  const {
    Dr_firstName,
    Dr_lastName,
    Dr_age,
    experience,
    specialization,
    Dr_profileImg,
    address_name,
    email,
    password,
  } = req.body
  try {
    let emailRegister = DrEmailRegister(email, password)
    let addresRegister = DrAdrress(address_name)
    let doctorRegister = DrFullRegistration(
      Dr_firstName,
      Dr_lastName,
      Dr_age,
      experience,
      address_name,
      email
    )
    res.status(200).json({
      msg: 'Doctor Registered Successfully',
    })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
}
const signUpPatient = (req, res, next) => {
  const {
    ps_firstName,
    ps_lastName,
    ps_age,
    ps_profileImg,
    address_name,
    email,
    password,
  } = req.body
}
const sampleRoute = async (req, res) => {
  let { name, password } = req.body
  try {
    let hashedPassword = await bcypt.hash(password, 10)
    let user = { userName: name, userPassword: hashedPassword }
    let sql = 'INSERT INTO userAuth SET ?'
    let query = db.query(sql, user, (err, result) => {
      if (err) throw err
      console.log(result)
      res.status(200).send('user fetched')
    })
  } catch (err) {
    console.log(err)
  }
}
const sampleRouteLogin = async (req, res) => {
  let { name, password } = req.body
  const sql = 'SELECT * FROM userAuth WHERE userName= ?'
  let query = db.query(sql, name, async (err, result) => {
    if (err) throw err
    try {
      let check = await bcypt.compare(password, result[0].userPassword)
      if (check) {
        res.sendStatus(200)
      } else {
        res.sendStatus(404)
      }
    } catch (error) {
      console.error(error)
    }
  })
}
module.exports = { signUpDoctor, signUpPatient, sampleRoute, sampleRouteLogin }
