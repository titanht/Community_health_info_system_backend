const db = require('../connect/connect')
const questionAsked = (req, res) => {
  const { title, text, img, email } = req.body
  const sqlInsertIntoQuestions = 'INSERT INTO questions SET ?'
  const findLoginedInUser = 'SELECT login_id FROM login WHERE email=?'
  const findPatientId = 'SELECT Ps_id FROM patients WHERE login_id=?'
  const findDoctorId = 'SELECT Dr_id FROM doctor WHERE login_id=?'

  db.query(findLoginedInUser, email, (err, LoginResult) => {
    if (err) throw err
    const loginID = LoginResult[0].login_id
    db.query(findPatientId, loginID, (err, PatientResult) => {
      if (err) throw err
      if (PatientResult == '') {
        db.query(findDoctorId, loginID, (err, DoctorResult) => {
          if (err) throw err
          if (DoctorResult == '') {
            console.log('doctor not found')
          } else {
            const drId = DoctorResult[0].Dr_id
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
                  data: QuestionResult,
                })
              }
            )
          }
        })
      } else {
        const patient_id = PatientResult[0].Ps_id
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
              data: QuestionResult,
            })
          }
        )
      }
    })
  })
}
const getQuestionTitleList = (req, res) => {
  const sqlGetQuestionsList =
    'SELECT question_title, patientId, doctor_id from questions'
  db.query(sqlGetQuestionsList, (err, QuestionTitleList) => {
    if (err) throw err
    res.status(200).json({
      msg: 'question titles are retrived from database',
      data: QuestionTitleList,
    })
  })
}
const getQuestionsDetailList = (req, res) => {
  const { questionTitle } = req.params
  console.log(questionTitle)
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

module.exports = { questionAsked, getQuestionTitleList, getQuestionsDetailList }
