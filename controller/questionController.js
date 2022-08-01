const db = require('../connect/connect')
const findLoginedInUser = 'SELECT login_id FROM login WHERE email=?'
const findPatientId = 'SELECT Ps_id FROM patients WHERE login_id=?'
const findDoctorId = 'SELECT Dr_id FROM doctor WHERE login_id=?'
const askQuestion = (req, res) => {
  const { title, text, img, email } = req.body
  const sqlInsertIntoQuestions = 'INSERT INTO questions SET ?'
  const findQuestion = 'SELECT * FROM questions where question_title = ?'

  db.query(findLoginedInUser, email, (err, LoginResult) => {
    if (err) throw err
    const loginID = LoginResult[0].login_id
    db.query(findPatientId, loginID, (err, PatientResult) => {
      if (err) throw err
      if (PatientResult == '') {
        db.query(findDoctorId, loginID, (err, DoctorResult) => {
          if (err) throw err
          if (DoctorResult == '') {
            res.status(404).json({
              msg: 'Doctor not found!',
              status: 'false',
            })
          } else {
            const drId = DoctorResult[0].Dr_id
            db.query(findQuestion, title, (err, QuestionResult) => {
              if (err) throw err
              if (QuestionResult == '') {
                const doctorQuestionAskedData = {
                  question_title: title,
                  question_text: text,
                  question_img: img,
                  doctor_id: drId,
                }
                db.query(
                  sqlInsertIntoQuestions,
                  doctorQuestionAskedData,
                  (err, QuestionResult) => {
                    res.status(200).json({
                      msg: 'Doctor question stored in database',
                      status: 'true',
                    })
                  }
                )
              } else {
                res.status(200).json({
                  msg: `Doctor question stored in database`,
                  status: 'true',
                })
              }
            })
          }
        })
      } else {
        const patient_id = PatientResult[0].Ps_id
        db.query(findQuestion, title, (err, QuestionResult) => {
          if (err) throw err
          if (QuestionResult == '') {
            const patientQuestionAskedData = {
              question_title: title,
              question_text: text,
              question_img: img,
              patientID: patient_id,
            }
            db.query(
              sqlInsertIntoQuestions,
              patientQuestionAskedData,
              (err, QuestionResult) => {
                res.status(200).json({
                  msg: 'Patient question saved to database',
                  status: 'true',
                })
              }
            )
          } else {
            res.status(200).json({
              msg: 'Patient question saved to database',
              status: 'true',
            })
          }
        })
      }
    })
  })
}
const getQuestionTitleList = (req, res) => {
  const sqlGetQuestionsList =
    'SELECT question_title, patientId, doctor_id from questions'
  db.query(sqlGetQuestionsList, (err, QuestionTitleList) => {
    if (err) throw err
    res.status(200).json(QuestionTitleList)
  })
}
const getQuestionsDetailList = (req, res) => {
  const { questionTitle } = req.params
  const sqlGetQuestionsList =
    'SELECT question_text, question_img, patientId, doctor_id from questions WHERE question_title=?'

  db.query(sqlGetQuestionsList, questionTitle, (err, QuestionDetailList) => {
    if (err) throw err
    res.status(200).json({
      msg: 'question details are retrived from database',
      data: QuestionDetailList,
    })
  })
}
const getQuestionTitlesAskedByUser = (req, res) => {
  const email = req.user
  const sqlFindQuestionByDoctor =
    'SELECT question_title  FROM questions WHERE  doctor_id=? '
  const sqlFindQuestionByPatient =
    'SELECT question_title FROM questions WHERE  patientId=? '
  db.query(findLoginedInUser, email, (err, LoginResult) => {
    if (err) throw err
    if (LoginResult == '') {
      res.status(404).json({
        msg: 'email not found',
      })
    } else {
      const loginID = LoginResult[0].login_id
      db.query(findDoctorId, loginID, (err, DoctorResult) => {
        if (err) throw err
        if (DoctorResult == '') {
          db.query(findPatientId, loginID, (err, PatientResult) => {
            if (err) throw err
            if (PatientResult == '') {
              res.status(404).json({
                msg: 'patient not found',
              })
            } else {
              const patientID = PatientResult[0].Ps_id
              db.query(
                sqlFindQuestionByPatient,
                patientID,
                (err, questionTitleResult) => {
                  if (err) throw err
                  res.status(200).json({
                    msg: `patient ${req.user} found`,
                    data: questionTitleResult,
                  })
                }
              )
            }
          })
        } else {
          const doctorID = DoctorResult[0].Dr_id
          db.query(
            sqlFindQuestionByDoctor,
            doctorID,
            (err, questionTitleResult) => {
              if (err) throw err
              res.status(200).json({
                msg: `doctor ${req.user} found`,
                data: questionTitleResult,
              })
            }
          )
        }
      })
    }
  })
}
module.exports = {
  askQuestion,
  getQuestionTitleList,
  getQuestionsDetailList,
  getQuestionTitlesAskedByUser,
}
