const express = require('express')
const { moreDoctor, morePatient } = require('../controller/userAuthControllers')
const { EmailRegister } = require('../controller/EmailRegister')
const { authLogin } = require('../controller/AuthLogin')
const router = express.Router()
router.route('/signup/').post(EmailRegister)
router.route('/more/patient').post(morePatient)
router.route('/more/doctor').post(moreDoctor)

router.route('/Login').post(authLogin)

module.exports = { router }
