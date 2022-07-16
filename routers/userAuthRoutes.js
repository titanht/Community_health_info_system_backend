const express = require('express')
const { moreDoctor, morePatient } = require('../controller/userAuthControllers')
const { EmailRegister } = require('../controller/EmailRegister')
const { authLogin } = require('../controller/AuthLogin')
const {
  questionAsked,
  getQuestionTitleList,
  getQuestionsDetailList,
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
const router = express.Router()
router.route('/signup').post(EmailRegister)
router.route('/more/patient').post(morePatient)
router.route('/more/doctor').post(moreDoctor)
router.route('/Login').post(authLogin)
router.route('/question').post(questionAsked).get(getQuestionTitleList)
router.route('/question/:questionTitle').get(getQuestionsDetailList)
router.route('/answer').post(saveReplayedAnswers)
router.route('/answer/:questionTitle').get(getAnswersList)
router.route('/vote/add').post(addVote)
router.route('/vote/remove').post(removeVote)
router.route('/vote/:answerText').get(getVote)
module.exports = { router }
