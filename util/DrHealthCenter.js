const db = require('../connect/connect')
const sqlInsertIntoHealthCenter = 'INSERT INTO health_center SET ?'
const sqlFindHealthCenter =
  'SELECT * FROM health_center where health_center_name=?'
const sqlSearchDoctorAddressID =
  'SELECT address_id FROM address where address_name=?'
const RegDrHealthCenter = (work_location, addressName) => {
  db.query(sqlFindHealthCenter, work_location, (err, result) => {
    if (err) throw err
    if (result == '') {
      db.query(sqlSearchDoctorAddressID, addressName, (err, AddresResult) => {
        if (err) throw err
        const addressId = AddresResult[0].address_id
        const HealthCenterData = {
          health_center_name: work_location,
          address_id: addressId,
        }
        db.query(sqlInsertIntoHealthCenter, HealthCenterData, (err, result) => {
          if (err) throw err
        })
      })
    }
  })
}
module.exports = { RegDrHealthCenter }
