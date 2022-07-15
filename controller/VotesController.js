const db = require('../connect/connect')
const addVote = (req, res) => {
  const { answerText, email } = req.body
  const sqlFindAnswerId = 'SELECT answer_id FROM answers WHERE answer_text=?'
  const sqlSaveVote = 'INSERT INTO vote SET ?'
  const sqlFindVoteCount = 'SELECT vote_count FROM vote WHERE patients_id=?'
  const sqlFindLoginId = 'SELECT login_id FROM login WHERE email= ?'
  const sqlFindPatientId = 'SELECT Ps_id FROM patients WHERE login_id= ?'
  db.query(sqlFindAnswerId, answerText, (err, answerResult) => {
    if (err) throw err
    const answerID = answerResult[0].answer_id
    if (answerResult == '') {
      res.status(404).json({
        msg: 'answer id not found',
      })
    } else {
      db.query(sqlFindLoginId, email, (err, loginResult) => {
        if (err) throw err
        const loginID = loginResult[0].login_id
        if (loginResult == '') {
          res.status(404).json({
            msg: 'login id  not found',
          })
        } else {
          db.query(sqlFindPatientId, loginID, (err, patientResult) => {
            if (err) throw err
            const patientID = patientResult[0].Ps_id
            if (patientResult == '') {
              res.status(404).json({
                msg: 'patient id not found',
              })
            } else {
              db.query(sqlFindVoteCount, patientID, (err, voteResult) => {
                if (err) throw err
                const voteCount = voteResult[0].vote_count
                if (voteResult == '') {
                  const voteData = {
                    answer_id: answerID,
                    vote_count: 1,
                    patinet_id: patientID,
                  }
                  db.query(sqlSaveVote, voteData, (err, result) => {
                    res.status(200).json({
                      msg: `first vote recoreded by patientID: ${patientID} to answerID: ${answerID}`,
                      data: result,
                    })
                  })
                } else {
                  //vote must be once
                  let addVoteCount = voteCount + 1
                  const voteData = {
                    answer_id: answerID,
                    vote_count: addVoteCount,
                    patinet_id: patientID,
                  }
                  db.query(sqlSaveVote, voteData, (err, result) => {
                    res.status(200).json({
                      msg: `additional vote recoreded by patientID: ${patientID} to answerID: ${answerID}`,
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
  })
}
