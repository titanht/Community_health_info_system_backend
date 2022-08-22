const ApiError = require('./api-error');

module.exports = (req, res, next, err) => {
  console.log('APP ERROR', err);

  let status = 500;
  let msg = 'Unknown server error occurred';
  let errors = {};

  if (err instanceof ApiError) {
    status = err.status;
    msg = err.msg;
    errors = err.errors;
  }
  // else if (err instanceof CustomError) {
  // TODO: Handle Other custom errors
  // }

  res.status(status).json({
    msg,
    errors,
  });
};
