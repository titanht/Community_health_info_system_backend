const db = require('../connect/connect')
const sqlFindAnswerId = 'SELECT answer_id FROM answers WHERE answer_text=?'
const sqlSaveVote = 'INSERT INTO vote SET ?'
const sqlUpdateVote = 'UPDATE vote SET vote_count=? WHERE answer_id=?'
const sqlFindVoteCountUsingPatientID =
  'SELECT vote_count FROM vote WHERE patients_id=?'
const sqlFindVoteCountUsingAnswerID =
  'SELECT vote_count FROM vote WHERE answer_id=? '
const sqlFindLoginId = 'SELECT login_id FROM login WHERE email= ?'
const sqlFindPatientId = 'SELECT Ps_id FROM patients WHERE login_id= ?'
const addVote = (req, res) => {
  const { answerText, email } = req.body
  db.query(sqlFindAnswerId, answerText, (err, answerResult) => {
    if (err) throw err
    if (answerResult == '') {
      res.status(404).json({
        msg: 'answer id not found',
        status: 'false',
      })
    } else {
      const answerID = answerResult[0].answer_id
      db.query(sqlFindLoginId, email, (err, loginResult) => {
        if (err) throw err
        if (loginResult == '') {
          res.status(404).json({
            msg: 'login id  not found',
            status: 'false',
          })
        } else {
          const loginID = loginResult[0].login_id
          db.query(sqlFindPatientId, loginID, (err, patientResult) => {
            if (err) throw err
            if (patientResult == '') {
              res.status(404).json({
                msg: 'patient id not found',
                status: 'false',
              })
            } else {
              const patientID = patientResult[0].Ps_id
              db.query(
                sqlFindVoteCountUsingPatientID,
                patientID,
                (err, voteResult) => {
                  if (err) throw err
                  if (voteResult == '') {
                    const voteData = {
                      answer_id: answerID,
                      vote_count: 1,
                      patients_id: patientID,
                    }
                    db.query(sqlSaveVote, voteData, (err, result) => {
                      res.status(200).json({
                        msg: `first vote recoreded by patientID: ${patientID} to answerID: ${answerID}`,
                        status: 'true',
                      })
                    })
                  } else {
                    //vote must be once
                    const voteCount = voteResult[0].vote_count
                    let addVoteCount = voteCount + 1
                    const updateVoteData = [addVoteCount, answerID]
                    db.query(sqlUpdateVote, updateVoteData, (err, result) => {
                      if (err) throw err
                      res.status(200).json({
                        msg: `additional vote recoreded by patientID: ${patientID} to answerID: ${answerID}`,
                        status: 'true',
                      })
                    })
                  }
                }
              )
            }
          })
        }
      })
    }
  })
}
const removeVote = (req, res) => {
  const { answerText, email } = req.body
  db.query(sqlFindAnswerId, answerText, (err, answerResult) => {
    if (err) throw err
    if (answerResult == '') {
      res.status(404).json({
        msg: 'answer id not found',
        status: 'false',
      })
    } else {
      const answerID = answerResult[0].answer_id
      db.query(sqlFindLoginId, email, (err, loginResult) => {
        if (err) throw err
        const loginID = loginResult[0].login_id
        if (loginResult == '') {
          res.status(404).json({
            msg: 'login id  not found',
            status: 'false',
          })
        } else {
          db.query(sqlFindPatientId, loginID, (err, patientResult) => {
            if (err) throw err
            if (patientResult == '') {
              res.status(404).json({
                msg: 'patient id not found',
                status: 'false',
              })
            } else {
              const patientID = patientResult[0].Ps_id
              db.query(
                sqlFindVoteCountUsingPatientID,
                patientID,
                (err, voteResult) => {
                  if (err) throw err
                  if (voteResult == '') {
                    const voteData = {
                      answer_id: answerID,
                      vote_count: -1,
                      patients_id: patientID,
                    }
                    db.query(sqlSaveVote, voteData, (err, result) => {
                      res.status(200).json({
                        msg: `first vote reduce recoreded by patientID: ${patientID} to answerID: ${answerID}`,
                        status: 'true',
                      })
                    })
                  } else {
                    //vote must be once
                    const voteCount = voteResult[0].vote_count //vote must be once
                    let addVoteCount = voteCount - 1
                    const voteData = [addVoteCount, answerID]
                    db.query(sqlUpdateVote, voteData, (err, result) => {
                      res.status(200).json({
                        msg: `additional vote reduce recoreded by patientID: ${patientID} to answerID: ${answerID}`,
                        data: result,
                      })
                    })
                  }
                }
              )
            }
          })
        }
      })
    }
  })
}
const getVote = (req, res) => {
  const { answerText } = req.params
  db.query(sqlFindAnswerId, answerText, (err, answerResult) => {
    if (err) throw err
    const answerID = answerResult[0].answer_id
    if (answerResult == '') {
      res.status(404).json({
        msg: 'answer id not found',
        status: 'false',
      })
    } else {
      db.query(sqlFindVoteCountUsingAnswerID, answerID, (err, voteResult) => {
        if (err) throw err
        if (voteResult == '') {
          res.status(404).json({
            msg: 'vote count not found',
            status: 'false',
          })
        } else {
          console.log(voteResult)
          res.status(200).json({
            msg: 'vote count retrived success fully',
            status: 'true',
          })
        }
      })
    }
  })
}
module.exports = { addVote, removeVote, getVote }
