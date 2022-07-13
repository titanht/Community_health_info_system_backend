const bcypt = require('bcrypt')
const { authLogin } = require('../util/AuthLogin')
const { DrAdrress } = require('../util/DrAddress')
const { RegDrHealthCenter } = require('../util/DrHealthCenter')
const { DrRegistration } = require('../util/DrRegistration')
const { RegDoctorSpecialization } = require('../util/DrSpecialization')
const moreDoctor = async (req, res, next) => {
  const {
    Dr_firstName,
    Dr_lastName,
    Dr_age,
    experience,
    specialization,
    work_location,
    Dr_profileImg,
    address_name,
    email,
  } = req.body
  try {
    DrAdrress(address_name)
    RegDrHealthCenter(work_location, address_name)
    RegDoctorSpecialization(specialization)
    DrRegistration(
      Dr_firstName,
      Dr_lastName,
      Dr_age,
      experience,
      address_name,
      email,
      Dr_profileImg,
      specialization,
      work_location
    )
    res.status(200).json({
      msg: 'Doctor Registered Successfully',
    })
  } catch (error) {
    res.sendStatus(500)
  }
}
const morePatient = (req, res, next) => {
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
const Login = async (req, res) => {
  const { email, password } = req.body
  const userLogin = authLogin(email, password)
}
module.exports = { moreDoctor, morePatient, Login }
