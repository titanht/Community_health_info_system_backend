const AnswerRepo = require('../repo/answer.repo');
const VoteRepo = require('../repo/vote.repo');

const VoteService = {
  /**
   *
   * @param {string} answerText
   * @param {Function} apiCb
   */
  getVote: (answerText, apiCb) => {
    AnswerRepo.findByText(answerText, (answerErr, answerResult) => {
      if (answerErr) return apiCb(answerErr, null);

      const answerId = answerResult[0].answer_id;
      VoteRepo.findVoteCountByAnswerId(answerId, (voteErr, voteResult) => {
        if (voteErr) return apiCb(voteErr, null);

        apiCb(null, answerResult);
      });
    });
  },
};

module.exports = VoteService;
