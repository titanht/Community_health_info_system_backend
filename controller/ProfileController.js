const db = require('../connect/connect')
const sqlFindLoginId = 'SELECT login_id FROM login WHERE email=?'
const sqlFindDoctorProfile = 'SELECT * FROM doctor WHERE login_id=?'
const sqlFindPatientProfile = 'SELECT * FROM patients WHERE login_id=?'
const sqlFindSpecialization =
  'SELECT specialization FROM specialization WHERE specialization_id=?'
const sqlFindAddress = 'SELECT address_name FROM address WHERE address_id=?'
const getUserProfile = (req, res) => {
  const { email } = req.params
  db.query(sqlFindLoginId, email, (err, loginResult) => {
    if (err) throw err
    if (loginResult == '') {
      res.status(404).json({
        msg: 'user not found',
        status: 'false',
      })
    } else {
      const loginID = loginResult[0].login_id
      db.query(sqlFindPatientProfile, loginID, (err, patientResult) => {
        if (err) throw err
        if (patientResult == '') {
          db.query(sqlFindDoctorProfile, loginID, (err, doctorResult) => {
            if (err) throw err
            if (doctorResult == '') {
              res.sendStatus(404)
            } else {
              const specializationID = doctorResult[0].specialID
              const addressID = doctorResult[0].address_id
              db.query(sqlFindAddress, addressID, (err, addressResult) => {
                if (err) throw err
                db.query(
                  sqlFindSpecialization,
                  specializationID,
                  (err, specialResult) => {
                    if (err) throw err
                    let profileData = {
                      first_name: doctorResult[0].Dr_firstName,
                      last_name: doctorResult[0].Dr_lastName,
                      age: doctorResult[0].Dr_age,
                      experience: doctorResult[0].experience,
                      specialization: specialResult[0].specialization,
                      address: addressResult[0].address_name,
                      profile_image: doctorResult[0].Dr_profileImg,
                    }
                    res.status(200).json(profileData)
                  }
                )
              })
            }
          })
        } else {
          const addressID = patientResult[0].address_id
          db.query(sqlFindAddress, addressID, (err, addressResult) => {
            if (err) throw err
            let profileData = {
              first_name: patientResult[0].Ps_firstName,
              last_name: patientResult[0].Ps_lastName,
              age: patientResult[0].Ps_age,
              address: addressResult[0].address_name,
              profile_image: patientResult[0].Ps_profileImg,
            }
            res.status(200).json(profileData)
          })
        }
      })
    }
  })
}
const identifyUser = (req, res) => {
  const { email } = req.params
  db.query(sqlFindLoginId, email, (err, loginResult) => {
    if (err) throw err
    if (loginResult == '') {
      res.sendStatus(404)
    } else {
      const loginID = loginResult[0].login_id
      db.query(sqlFindDoctorProfile, loginID, (err, doctorResult) => {
        if (err) throw err
        if (doctorResult == '') {
          res.status(200).json({
            msg: 'patient',
          })
        } else
          res.status(200).json({
            msg: 'doctor',
          })
      })
    }
  })
}
module.exports = { getUserProfile, identifyUser }
