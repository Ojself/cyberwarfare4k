const express = require('express');

const router = express.Router();
const User = require('../models/User');
const BetaForum = require('../models/BetaForum');

const generateFakeComment = (userName) => [{
  _id: '5fd68c2d87afd469a789f275',
  edited: false,
  deleted: false,
  likes: [],
  seenBy: [],
  creator: {
    _id: '5fca3b4a86e77b5c8e58b683',
    account: { avatar: '/hackerAvatars/Waifu/greenblack.png' },
    name: 'Admin_Tor',
  },
  comment: `I think ${userName} might be cheating.. what a fool!`,
  alliance: null,
  allianceForum: false,
  createdAt: '2020-12-01T10:01:29.091Z',
  updatedAt: '2020-12-01T10:01:30.348Z',
}];

const getBetaForumCriterias = (user) => {
  if (!user) {
    return 'something went wrong...';
  }

  return null;
};

const postBetaForumCriterias = (user, comment, params) => {
  if (params.alliance !== 'global' && params.alliance && (user.alliance.toString() !== params.alliance)) {
    return "you don't have access this forum";
  }
  if (comment.length > 250) {
    return 'Your post is too long...';
  }
  if (comment.length < 2) {
    return 'Your post is too short...';
  }

  if (comment.toLowerCase().includes('script>')) {
    return 'no need for your script tags here...';
  }
  return null;
};

// gets forums and thread count
router.get('/', async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  const params = {
    allianceForum: false,
    alliance: null,
    deleted: false,
  };
  const query = req.query.alliance;
  if (query !== 'global') {
    params.allianceForum = true;
    params.alliance = query;
  }

  const disallowed = getBetaForumCriterias(user, params);

  if (disallowed) {
    return res.status(403).json({
      success: false,
      message: disallowed,
    });
  }

  /* easter egg */
  if (params.alliance !== 'global' && user.alliance) {
    if (user.alliance.toString() !== params.alliance && params.alliance) {
      const fakeComment = generateFakeComment(user.name);

      return res.status(200).json({
        success: true,
        message: 'Forum comments loaded...',
        comments: fakeComment,
      });
    }
  }

  const comments = await BetaForum
    .find(params)
    .sort({ createdAt: -1 })
    .populate('creator', ['name', 'account.avatar'])
    .populate('likes', 'name');

  comments.forEach((n) => n.readMe(userId));
  await Promise.all(comments.map((m) => m.save()));

  return res.status(200).json({
    success: true,
    message: 'Forum comments loaded...',
    comments,
  });
});

router.post('/', async (req, res) => {
  const userId = req.user._id;
  const { comment, forumType } = req.body;

  const params = {
    allianceForum: false,
    alliance: null,
  };

  if (forumType !== 'global') {
    params.allianceForum = true;
    params.alliance = forumType; // objectId
  }

  const user = await User.findById(userId);
  const disallowed = postBetaForumCriterias(user, comment, params);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message: disallowed,
    });
  }

  // createdAt might differ from server time
  const forumComment = new BetaForum({
    creator: user._id,
    seenBy: [userId],
    comment,
    alliance: params.alliance,
    allianceForum: params.allianceForum,
  });

  forumComment.save().then((commentSaveResult) => {
    commentSaveResult.populate('creator', ['name', 'account.avatar']).execPopulate()
      .then((result) => res.status(200).json({
        success: true,
        message: 'Your comment has been posted',
        comment: result,
      }));
  });
});

/* Toggles comment like (thumbs up) */
router.put('/:commentId', async (req, res) => {
  const userId = req.user._id;
  const { commentId } = req.params;

  const comment = await BetaForum.findById(commentId);

  // criterias?
  comment.addRemoveLike(userId);
  const savedComment = await comment.save();
  const populatedComment = await savedComment
    .populate('creator', ['name', 'account.avatar'])
    .populate('likes', 'name')
    .execPopulate();

  return res.status(200).json({
    comment: populatedComment,
    success: true,
    message: 'Comment liked/unliked!',
  });
});

const checkCommentDeleteCriteria = (comment, userId) => {
  if (!comment || !userId){
    return "Something went wrong.."
  }
  if (JSON.stringify(comment.creator) !== JSON.stringify(userId)){
    return "You can only delete your own comment!"
  }
  return null
}

// deletes comment
router.delete('/:commentId', async (req, res) => {
  const { commentId } = req.params
  // const { threadId,forumId } = req.body
  const userId = req.user._id;
  const comment = await BetaForum.findById(commentId);

  const disallowed = checkCommentDeleteCriteria(comment, userId);
  if (disallowed) {
    return res.status(400).json({
      success: false,
      message:disallowed,
    });
  }
  comment.deleteComment();

  return res.status(200).json({
    success: true,
    message: 'comment deleted',
    comment
  });
});

/* router.patch('/:id', async (req, res) => {
  const userId = req.user._id;
  const { commentId, newComment } = req.body;
  const comment = await BetaForum.findById(commentId);

  const message = checkCommentEditCriteria(newComment, comment, userId);

  if (message) {
    return res.status(400).json({
      success: false,
      message,
    });
  }
  comment.editComment(newComment);

  return res.status(200).json({
    success: true,
    message: 'Message successfuly edited',
  });
}); */

module.exports = router;
