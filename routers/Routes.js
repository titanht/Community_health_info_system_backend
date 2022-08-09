const express = require('express')
const {
  moreDoctor,
  moreUser,
} = require('../controller/UserFullRegistrationController')
const { EmailRegister } = require('../controller/EmailRegister')
const { authLogin } = require('../controller/AuthLogin')
const {
  getQuestionTitleList,
  getQuestionsDetailList,
  askQuestion,
  getQuestionTitlesAskedByUser,
} = require('../controller/questionController')
const {
  saveReplayedAnswers,
  getAnswersList,
} = require('../controller/AnswerController')
const {
  addVote,
  removeVote,
  getVote,
} = require('../controller/VotesController')
const { authenticateToken } = require('../middlewares/authenticateToken')
const { regenerateAccessToken } = require('../controller/TokenController')
const { logout } = require('../controller/Logout')
const router = express.Router()
router.route('/signup').post(EmailRegister)
router.route('/more/user').post(moreUser)
router.route('/more/doctor').post(moreDoctor)
router.route('/Login').post(authLogin)
router.route('/question').post(askQuestion).get(getQuestionTitleList)
router.route('/question/:questionTitle').get(getQuestionsDetailList)
router
  .route('/question/user/title')
  .get(authenticateToken, getQuestionTitlesAskedByUser)
router.route('/answer').post(saveReplayedAnswers)
router.route('/answer/:questionTitle').get(getAnswersList)
router.route('/vote/add').post(addVote)
router.route('/vote/remove').post(removeVote)
router.route('/vote/:answerText').get(getVote)
router.route('/token').post(regenerateAccessToken)
router.route('/logout').delete(logout)
module.exports = { router }
