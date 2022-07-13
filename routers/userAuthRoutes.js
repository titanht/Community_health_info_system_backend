const express = require('express')
const {
  Login,
  moreDoctor,
  morePatient,
} = require('../controller/userAuthControllers')
const { EmailRegister } = require('../controller/EmailRegister')
const router = express.Router()
router.route('/signup/').post(EmailRegister)
router.route('/more/patient').post(morePatient)
router.route('/more/doctor').post(moreDoctor)

router.route('/Login').post(Login)

module.exports = { router }
