const db = require('../connect/connect')
const saveReplayedAnswers = (req, res) => {
  const { question_title, email, answerText, answerImage } = req.body
  const sqlFindQuestionId =
    'SELECT question_id FROM questions WHERE question_title=?'
  const sqlFindLoginId = 'SELECT login_id FROM login WHERE email=?'
  const sqlFindDoctorId = 'SELECT Dr_id FROM doctor WHERE login_id=?'
  const sqlInsertInToAnswer = 'INSERT INTO answers SET ?'
  db.query(sqlFindQuestionId, question_title, (err, QuestionResult) => {
    if (err) throw err
    const question_id = QuestionResult[0].question_id
    if (QuestionResult == '') {
      res.status(400).json({
        msg: 'questionId  not found',
      })
    } else {
      db.query(sqlFindLoginId, email, (err, LoginResult) => {
        if (err) throw err
        const loginID = LoginResult[0].login_id
        if (LoginResult == '') {
          res.status(404).json({
            msg: 'Doctor not registered!!',
          })
        } else {
          db.query(sqlFindDoctorId, loginID, (err, DoctorResult) => {
            if (err) throw err
            const doctorID = DoctorResult[0].Dr_id
            if (DoctorResult == '') {
              res.status(404).json({
                msg: 'Doctor id is not found!!',
              })
            } else {
              const answeredData = {
                answer_text: answerText,
                answer_img: answerImage,
                doctor_id: doctorID,
                questionID: question_id,
              }
              db.query(sqlInsertInToAnswer, answeredData, (err, result) => {
                if (err) throw err
                res.status(200).json({
                  msg: `doctor answer to questionId: ${question_id} saved to database`,
                  data: result,
                })
              })
            }
          })
        }
      })
    }
  })
}
const getAnswersList = (req, res) => {
  const { questionTitle } = req.params
  const sqlFindQuestionsID =
    'SELECT question_id FROM questions WHERE question_title=?'
  const sqlFindAnswersByQuestionId =
    'SELECT answer_text, answer_img, doctor_id FROM answers WHERE questionID=?'

  db.query(sqlFindQuestionsID, questionTitle, (err, QuestionIdResult) => {
    if (err) throw err
    const questionID = QuestionIdResult[0].question_id
    if (QuestionIdResult == '') {
      res.status(404).json({
        msg: 'question id not found',
      })
    } else {
      db.query(sqlFindAnswersByQuestionId, questionID, (err, answerResult) => {
        if (err) throw err
        res.status(200).json({
          msg: `answers to questionID: ${questionID} are retrived from database`,
          data: answerResult,
        })
      })
    }
  })
}

module.exports = { saveReplayedAnswers, getAnswersList }
