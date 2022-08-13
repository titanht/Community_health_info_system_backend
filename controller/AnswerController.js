const db = require('../connect/connect')
const saveReplayedAnswers = (req, res) => {
  const { question_title, email, answerText, answerImage } = req.body
  const sqlFindQuestionId =
    'SELECT question_id FROM questions WHERE question_title=?'
  const sqlFindLoginId = 'SELECT login_id FROM login WHERE email=?'
  const sqlFindDoctorId = 'SELECT Dr_id FROM doctor WHERE login_id=?'
  const sqlInsertInToAnswer = 'INSERT INTO answers SET ?'
  const sqlFindAnswer = 'SELECT * FROM answers WHERE answer_text=?'
  db.query(sqlFindQuestionId, question_title, (err, QuestionResult) => {
    if (err) throw err
    if (QuestionResult == '') {
      res.status(404).json({
        msg: 'question  not found',
        status: 'false',
      })
    } else {
      const question_id = QuestionResult[0].question_id
      db.query(sqlFindLoginId, email, (err, LoginResult) => {
        if (err) throw err
        if (LoginResult == '') {
          res.status(404).json({
            msg: 'Doctor not registered!!',
            status: 'false',
          })
        } else {
          const loginID = LoginResult[0].login_id
          db.query(sqlFindDoctorId, loginID, (err, DoctorResult) => {
            if (err) throw err
            if (DoctorResult == '') {
              res.status(404).json({
                msg: 'Doctor id is not found!!',
                status: 'false',
              })
            } else {
              const doctorID = DoctorResult[0].Dr_id
              db.query(sqlFindAnswer, answerText, (err, answerResult) => {
                if (err) throw err
                if (answerResult == '') {
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
                      status: 'true',
                    })
                  })
                } else {
                  res.status(200).json({
                    msg: `Same answer exits`,
                    status: 'true',
                  })
                }
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
  const sqlFindAnswersByQuestionId = 'SELECT * FROM answers WHERE questionID=?'
  const sqlFindDoctorName =
    'SELECT Dr_firstName,Dr_lastName FROM doctor WHERE Dr_id=? '
  const sqlVoteCount = 'SELECT vote_count FROM vote WHERE answer_id=? '

  db.query(sqlFindQuestionsID, questionTitle, (err, QuestionIdResult) => {
    if (err) throw err
    const questionID = QuestionIdResult[0].question_id
    if (QuestionIdResult == '') {
      res.status(404).json({
        msg: 'question id not found',
        status: 'false',
      })
    } else {
      db.query(sqlFindAnswersByQuestionId, questionID, (err, answerResult) => {
        if (err) throw err

        var dataToBeSent = {
          msg: `answers to questionID: ${questionID} are retrived from database`,
          status: 'true',
          data: [],
        }
        for (let i = 0; i < answerResult.length; i++) {
          db.query(
            sqlFindDoctorName,
            answerResult[i].doctor_id,
            (err, doctorResult) => {
              if (err) throw err
              db.query(
                sqlVoteCount,
                answerResult[i].answer_id,
                (err, voteResult) => {
                  if (voteResult == '') {
                    let dataFetched = {
                      doctor_name: `${doctorResult[0].Dr_firstName} ${doctorResult[0].Dr_lastName}`,
                      answer_text: `${answerResult[i].answer_text}`,
                      answer_image: `${answerResult[i].answer_img}`,
                      vote_count: 0,
                    }
                    dataToBeSent.data.push(dataFetched)
                    if (i == answerResult.length - 1) {
                      res.status(200).json(dataToBeSent)
                    }
                  } else {
                    let dataFetched = {
                      doctor_name: `${doctorResult[0].Dr_firstName} ${doctorResult[0].Dr_lastName}`,
                      answer_text: `${answerResult[i].answer_text}`,
                      answer_image: `${answerResult[i].answer_img}`,
                      vote_count: `${voteResult[i].vote_count}`,
                    }
                    dataToBeSent.data.push(dataFetched)
                    if (i == answerResult.length - 1) {
                      res.status(200).json(dataToBeSent)
                    }
                  }
                }
              )
            }
          )
        }
      })
    }
  })
}

module.exports = { saveReplayedAnswers, getAnswersList }
