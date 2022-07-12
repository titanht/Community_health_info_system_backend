const express = require('express')
const {
  signUpPatient,
  signUpDoctor,
  sampleRoute,
  sampleRouteLogin,
} = require('../controller/userAuthControllers')
const router = express.Router()
router.route('/signUp/doctor').post(signUpDoctor)
router.route('/signUp/patient').post(signUpPatient)
router.route('/sampleRoute').post(sampleRoute).get(sampleRouteLogin)

module.exports = { router }
