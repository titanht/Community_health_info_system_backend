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
const router = express.Router()
router.route('/signup').post(EmailRegister)
router.route('/more/patient').post(morePatient)
router.route('/more/doctor').post(moreDoctor)
router.route('/Login').post(authLogin)
router.route('/question').post(questionAsked).get(getQuestionTitleList)
router.route('/question/:questionTitle').get(getQuestionsDetailList)
router.route('/answer').post(saveReplayedAnswers)
router.route('/answer/:questionTitle').get(getAnswersList)
router.route('/vote/add').post()
router.route('/vote/remove').post()
router.route('/vote/:answerText').get()
module.exports = { router }
