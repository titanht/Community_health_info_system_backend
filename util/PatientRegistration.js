const db = require('../connect/connect')
const patientRegistration = (
  firstName,
  lastName,
  age,
  address,
  email,
  profileImage
) => {
  const sqlInsertIntoPatientTable = 'INSERT INTO patients SET ?'
  const sqlSearchPatientLoginID = 'SELECT login_id FROM login where email=?'
  const sqlSearchPatientAddressID =
    'SELECT address_id FROM address where address_name=?'
  db.query(sqlSearchPatientLoginID, email, (err, LoginResult) => {
    if (err) throw err
    db.query(sqlSearchPatientAddressID, address, (err, AddressResult) => {
      if (err) throw err
      const loginID = LoginResult[0].login_id
      const addressID = AddressResult[0].address_id
      const patientRegistrationData = {
        Ps_firstName: firstName,
        Ps_lastName: lastName,
        Ps_age: age,
        Ps_profileImg: profileImage,
        address_id: addressID,
        login_id: loginID,
      }
      db.query(
        sqlInsertIntoPatientTable,
        patientRegistrationData,
        (err, result) => {
          if (err) throw err
        }
      )
    })
  })
}
module.exports = {
  patientRegistration,
}
