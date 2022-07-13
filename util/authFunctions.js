const db = require('../connect/connect')
const bcrypt = require('bcrypt')
const DrEmailRegister = (email, password) => {
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
const DrRegistration = (
  firstName,
  lastName,
  age,
  Drexperience,
  address,
  email,
  profileImage,
  DrSpecialization,
  work_location
) => {
  const sqlSearchDoctorLoginID = 'SELECT login_id FROM login where email=?'
  const sqlSearchDoctorAddressID =
    'SELECT address_id FROM address where address_name=?'
  const sqlInsertIntoDoctorTable = 'INSERT INTO doctor SET ?'
  const regDoctor = db.query(
    sqlSearchDoctorLoginID,
    email,
    (err, LoginResult) => {
      if (err) throw err
      const findAddressId = db.query(
        sqlSearchDoctorAddressID,
        address,
        (err, AddressResult) => {
          if (err) throw err
          let loginId = LoginResult[0].login_id
          let addressId = AddressResult[0].address_id
          drRegHealthCenter(work_location, addressId)
          drRegSpecialization(DrSpecialization)
          const DrRegistrationData = {
            Dr_firstName: firstName,
            Dr_lastName: lastName,
            Dr_age: age,
            experience: Drexperience,
            address_id: addressId,
            login_id: loginId,
            Dr_profileImg: profileImage,
          }
          const DrRegistration = db.query(
            sqlInsertIntoDoctorTable,
            DrRegistrationData,
            (err, result) => {
              if (err) throw err
            }
          )
        }
      )
    }
  )
}
const drRegSpecialization = (DrSpecialization) => {
  const sqlInsertIntoSpecialization = 'INSERT INTO specialization SET ?'
  const specializationData = {
    specialization: DrSpecialization,
  }
  const sqlFindSpecialization =
    'SELECT * FROM specialization where specialization=?'
  db.query(sqlFindSpecialization, DrSpecialization, (err, result) => {
    if (err) throw err
    if (result == '') {
      const DrSpecializationReg = db.query(
        sqlInsertIntoSpecialization,
        specializationData,
        (err, result) => {
          if (err) throw err
        }
      )
    } else {
      console.log('spcecialization available')
    }
  })
}
const drRegHealthCenter = (work_location, addressID) => {
  const sqlInsertIntoHealthCenter = 'INSERT INTO health_center SET ?'
  const HealthCenterData = {
    health_center_name: work_location,
    address_id: addressID,
  }
  const sqlFindHealthCenter =
    'SELECT * FROM health_center where health_center_name=?'
  db.query(sqlFindHealthCenter, work_location, (err, result) => {
    if (err) throw err
    if (result == '') {
      const DrHealthCenterReg = db.query(
        sqlInsertIntoHealthCenter,
        HealthCenterData,
        (err, result) => {
          if (err) throw err
        }
      )
    } else {
      console.log('work location available')
    }
  })
}
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

module.exports = {
  DrEmailRegister,
  DrAdrress,
  DrRegistration,
  authLogin,
}
