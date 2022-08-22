const VoteService = require('../service/vote.service');

const VoteRefactorController = {
  getVote: (req, res, next) => {
    const { answerText } = req.params;

    VoteService.getVote(answerText, (err, voteCount) => {
      if (err) next(err);

      res.status(200).json({
        msg: 'vote count retrieved',
        data: voteCount,
      });
    });
  },
};

module.exports = VoteRefactorController;
