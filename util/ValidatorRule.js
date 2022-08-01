const { body, param } = require('express-validator')
const validationRule = (method) => {
  let input = {
    emailValidation: [
      body('email').isAlphanumeric().custom(idMatched),
      body('password').isAlphanumeric(),
    ],
    moreDoctorValidation: [
      body('id').isAlphanumeric().custom(findId),
      body('request').isString(),
    ],
    morePatientValidation: [
      body('value').custom(noSymbols).custom(atLeast).custom(noDuplication),
    ],
    Id: [param('id').isAlphanumeric().custom(findId)],
  }
  return input[method]
}
module.exports = { validationRule }
