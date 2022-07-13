const db = require('../connect/connect')
const patientAddress = (address) => {
  const sqlInsertIntoAdress = 'INSERT INTO address SET ?'
  const sqlSearchPatientAddress = 'SELECT * FROM address where address_name=?'

  const addressSearchQuery = db.query(
    sqlSearchPatientAddress,
    address,
    (err, result) => {
      if (err) throw err
      if (result == '') {
        const addressData = { address_name: address }
        db.query(sqlInsertIntoAdress, addressData, (err, result) => {
          if (err) throw err
          console.log('Doctor address added successfully ')
        })
      } else {
        console.log('user address available')
      }
    }
  )
}
module.exports = { patientAddress }
