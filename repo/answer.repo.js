const ApiError = require('../core/api-error');

const AnswerRepo = {
  /**
   *
   * @param {number} answerText
   * @param {Function} cb(err, result)
   *
   * @return {object}
   */
  findByText: (answerText, cb) => {
    const findTextStatement =
      'SELECT answer_id FROM answers WHERE answer_text=?';

    db.query(findTextStatement, answerText, (err, result) => {
      if (result.length === 0)
        return cb(new ApiError('Answer not found', 404, {}), null);

      cb(err, result);
    });
  },
};

module.exports = AnswerRepo;
