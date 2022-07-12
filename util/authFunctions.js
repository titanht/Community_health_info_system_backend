const db = require('../connect/connect')
const bcypt = require('bcrypt')
const DrEmailRegister = (email, password) => {
  const sqlSearchUserEmail = 'SELECT * FROM login where email=?'
  const sqlInsertIntoLogin = 'INSERT INTO login SET ?'
  const userSearchQuery = db.query(
    sqlSearchUserEmail,
    email,
    async (err, result) => {
      if (err) throw err
      if (result == '') {
        let hashedPassword = await bcypt.hash(password, 10)
        const loginData = { email, password: hashedPassword }
        const insertUser = db.query(
          sqlInsertIntoLogin,
          loginData,
          (err, result) => {
            if (err) throw err
          }
        )
      } else {
        console.log('user available')
      }
    }
  )
}
const DrAdrress = (address) => {
  const sqlInsertIntoAdress = 'INSERT INTO address SET ?'
  const sqlSearchUserAddress = 'SELECT * FROM address where address_name=?'

  const addressSearchQuery = db.query(
    sqlSearchUserAddress,
    address,
    (err, result) => {
      if (err) throw err
      if (result == '') {
        const addressData = { address_name: address }
        const insertDrAdrress = db.query(
          sqlInsertIntoAdress,
          addressData,
          (err, result) => {
            if (err) throw err
            console.log('Doctor address added successfully ')
          }
        )
      } else {
        console.log('user address available')
      }
    }
  )
}
const DrSpecialization = (specialization) => {
  const sqlInsertIntoAdress = 'INSERT INTO specialization SET ?'
  const sqlSearchUserAddress =
    'SELECT * FROM specialization where specialization=?'

  const addressSearchQuery = db.query(
    sqlSearchUserAddress,
    specialization,
    (err, result) => {
      if (err) throw err
      if (result == '') {
        const addressData = { address_name: address }
        const insertDrAdrress = db.query(
          sqlInsertIntoAdress,
          addressData,
          (err, result) => {
            if (err) throw err
            console.log('Doctor address added successfully ')
          }
        )
      } else {
        console.log('user address available')
      }
    }
  )
}
const DrFullRegistration = (
  firstName,
  lastName,
  age,
  experience,
  specialization,
  address,
  email
) => {
  const sqlSearchDoctorLoginID = 'SELECT login_id FROM login where email=?'
  const sqlSearchDoctorAddressID =
    'SELECT address_id FROM address where address_name=?'
  const sqlInsertIntoDoctorTable = 'INSERT INTO doctor SET ?'
  const findLoginId = db.query(
    sqlSearchDoctorLoginID,
    email,
    async (err, result) => {
      if (err) throw err
    }
  )
  const findAddressId = db.query(
    sqlSearchDoctorAddressID,
    address,
    async (err, result) => {
      if (err) throw err
    }
  )
  console.log(findLoginId)
  console.log(findAddressId.values)
}

module.exports = { DrEmailRegister, DrAdrress, DrFullRegistration }
