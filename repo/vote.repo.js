const ApiError = require('../core/api-error');

const VoteRepo = {
  /**
   *
   * @param {number} answerId
   * @param {Function} cb(err, result)
   *    err {Error}
   *    result {number}
   * @return {number} vote count
   */
  findVoteCountByAnswerId: (answerId, cb) => {
    const voteFinderStatement =
      'SELECT vote_count FROM vote WHERE answer_id=? ';

    db.query(voteFinderStatement, answerId, (err, result) => {
      if (result.length === 0)
        return cb(new ApiError('vote count not found', 404, {}));

      cb(err, result[0].vote_count);
    });
  },
};

module.exports = VoteRepo;
