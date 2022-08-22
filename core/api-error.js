class ApiError extends Error {
  msg = '';
  status = 500;
  errors = {};

  /**
   *
   * @param {string} msg
   * @param {number} status
   * @param {Object} errors
   */
  constructor(msg, status, errors = {}) {
    this.msg = msg;
    this.status = status;
    this.error = errors;
  }
}

module.exports = ApiError;
