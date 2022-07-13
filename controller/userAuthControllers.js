const bcypt = require('bcrypt')
const { DrAddress } = require('../util/DrAddress')
const { RegDrHealthCenter } = require('../util/DrHealthCenter')
const { DrRegistration } = require('../util/DrRegistration')
const { RegDoctorSpecialization } = require('../util/DrSpecialization')
const { patientAddress } = require('../util/PatientAddress')
const { patientRegistration } = require('../util/PatientRegistration')
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
    DrAddress(address_name)
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
  } = req.body
  patientAddress(address_name)
  patientRegistration(
    ps_firstName,
    ps_lastName,
    ps_age,
    address_name,
    email,
    ps_profileImg
  )
  res.status(200).json({
    msg: 'patient Registered Successfully',
  })
}

module.exports = { moreDoctor, morePatient }
