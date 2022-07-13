const bcypt = require('bcrypt')
const {
  DrEmailRegister,
  DrAdrress,
  DrRegistration,
  authLogin,
  // regSpcializationAndHealthCenter,
} = require('../util/authFunctions')
const signUpDoctor = (req, res, next) => {
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
    password,
  } = req.body
  try {
    let emailRegister = DrEmailRegister(email, password)
    let addresRegister = DrAdrress(address_name)
    let doctorRegister = DrRegistration(
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
    // let RegDoctorSpecializationAndHealthCenter =
    //   regSpcializationAndHealthCenter(specialization, email)

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
const Login = async (req, res) => {
  const { email, password } = req.body
  const userLogin = authLogin(email, password)
}
module.exports = { signUpDoctor, signUpPatient, Login }
