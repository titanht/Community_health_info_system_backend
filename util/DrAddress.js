const db = require('../connect/connect')
const DrAddress = (address) => {
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
module.exports = { DrAddress }
