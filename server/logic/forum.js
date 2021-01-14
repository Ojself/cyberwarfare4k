function putOriginalCommentFirst(comments) {
  if (!Array.isArray(comments) || comments.length < 1) {
    return;
  }
  comments.unshift(comments.pop(comments[comments.length - 1]));
}

/* not pretty, refactor this */
function checkCommentPostCriteria(comment, thread, user) {

  if (comment.length > 250) {
    return 'Your post is too long...';
  }

  if (comment.length < 2) {
    return 'Your post is too short...';
  }

  if (comment.toLowerCase().includes('script>')) {
    return 'no need for your script tags here...';
  }
  // todo, see if this works.
  if (thread.allianceThread && JSON.stringify(thread.allianceThread) !== JSON.stringify(user.alliance)) {
    return 'You don\'t belong to this alliance...';
  }

  return null;
}

function checkCommentDeleteCriteria(comment, userId) {
  if (JSON.stringify(comment.creator) !== JSON.stringify(userId)) {
    return 'You can only delete your own comments...';
  }
  return null;
}

function checkCommentEditCriteria(newComment, comment, userId) {
  if (JSON.stringify(comment.creator) !== JSON.stringify(userId)) {
    return 'You can only edit your own comments...';
  }
  return checkCommentPostCriteria(newComment);
}

module.exports = {
  putOriginalCommentFirst, checkCommentPostCriteria, checkCommentDeleteCriteria, checkCommentEditCriteria,
};
