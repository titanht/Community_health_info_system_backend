const db = require('../connect/connect')
const sqlFindQuestionId =
  'SELECT question_id FROM questions WHERE question_title=?'
const sqlSaveView = 'INSERT INTO views SET ?'
const sqlFindViewUsingQuesitionID =
  'SELECT view_count FROM views WHERE que_id=? '
const sqlUpdateView = 'UPDATE views SET view_count=? WHERE que_id=?'
const addView = (req, res) => {
  const { question_title } = req.body
  db.query(sqlFindQuestionId, question_title, (err, questionResult) => {
    if (err) throw err
    if (questionResult == '') {
      res.status(404).json({
        msg: 'question not found',
        status: 'false',
      })
    } else {
      const quesitonID = questionResult[0].question_id
      db.query(sqlFindViewUsingQuesitionID, quesitonID, (err, viewResult) => {
        if (err) throw err
        if (viewResult == '') {
          const viewData = {
            que_id: quesitonID,
            view_count: 1,
          }
          db.query(sqlSaveView, viewData, (err, viewResult) => {
            if (err) throw err
            res.status(200).json({
              msg: 'New view add to question',
              status: 'true',
            })
          })
        } else {
          const viewCount = viewResult[0].view_count
          let addViewCount = viewCount + 1
          const updateVoteData = [addViewCount, quesitonID]
          db.query(sqlUpdateView, updateVoteData, (err, viewUpdateResult) => {
            if (err) throw err
            res.status(200).json({
              msg: 'additon view add to question',
              status: 'true',
            })
          })
        }
      })
    }
  })
}

module.exports = { addView }
