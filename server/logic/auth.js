function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    /* next({ status: 403, message: 'Unauthorized' }); */
    return res.status(403).json({
      success: false,
      message: 'You are not logged in',
    });
  }
}

module.exports = {
  isLoggedIn,
};
