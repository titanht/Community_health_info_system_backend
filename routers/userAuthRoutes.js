const express = require('express')
const {
  signUpPatient,
  signUpDoctor,
  Login,
} = require('../controller/userAuthControllers')
const router = express.Router()
router.route('/signUp/doctor').post(signUpDoctor)
router.route('/signUp/patient').post(signUpPatient)
router.route('/Login').post(Login)

module.exports = { router }
