const { Request, Response, NextFunction } = require('express')
const { validationResult } = require('express-validator')
export const validateReq = (req, res, next) => {
  const error = validationResult(req)

  if (!error.isEmpty()) {
    return res.status(422).json({
      msg: 'invalid entry',
      error: error.array(),
    })
  }
  next()
}
