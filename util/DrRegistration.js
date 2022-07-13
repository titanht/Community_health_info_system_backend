const db = require('../connect/connect')
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
  const sqlInsertIntoDoctorTable = 'INSERT INTO doctor SET ?'
  const sqlSearchDoctorLoginID = 'SELECT login_id FROM login where email=?'
  const sqlSearchDoctorAddressID =
    'SELECT address_id FROM address where address_name=?'
  const sqlSearchSpecializationID =
    'SELECT specialization_id FROM specialization where specialization=?'
  const sqlSearchHealthCenterID =
    'SELECT health_center_id FROM health_center where health_center_name=?'
  db.query(sqlSearchDoctorLoginID, email, (err, LoginResult) => {
    if (err) throw err
    db.query(sqlSearchDoctorAddressID, address, (err, AddressResult) => {
      if (err) throw err
      db.query(
        sqlSearchSpecializationID,
        DrSpecialization,
        (err, specialResult) => {
          if (err) throw err
          db.query(
            sqlSearchHealthCenterID,
            work_location,
            (err, HealthCenterResult) => {
              if (err) throw err
              const loginID = LoginResult[0].login_id
              const addressID = AddressResult[0].address_id
              const special_ID = specialResult[0].specialization_id
              const healthCenterID = HealthCenterResult[0].health_center_id
              const DrRegistrationData = {
                Dr_firstName: firstName,
                Dr_lastName: lastName,
                Dr_age: age,
                experience: Drexperience,
                address_id: addressID,
                login_id: loginID,
                Dr_profileImg: profileImage,
                specialID: special_ID,
                healthCenterID: healthCenterID,
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
    })
  })
}
module.exports = {
  DrRegistration,
}
