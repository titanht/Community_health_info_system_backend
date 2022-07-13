const db = require('../connect/connect')
const sqlInsertIntoSpecialization = 'INSERT INTO specialization SET ?'
const sqlFindSpecialization =
  'SELECT * FROM specialization where specialization=?'
const RegDoctorSpecialization = (DrSpecialization) => {
  const specializationData = {
    specialization: DrSpecialization,
  }
  db.query(sqlFindSpecialization, DrSpecialization, (err, result) => {
    if (err) throw err
    if (result == '') {
      db.query(
        sqlInsertIntoSpecialization,
        specializationData,
        (err, result) => {
          if (err) throw err
        }
      )
    } else {
      console.log('spec available')
    }
  })
}
module.exports = { RegDoctorSpecialization }
