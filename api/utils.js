function requireUser(req, res, next) {
    if (!req.user) {
      next({
        error: "Error!",
        name: "MissingUserError",
        message: "You must be logged in to perform this action",
        status: 401,
      });
    }
  // if(req.user.name === 'Hunter Norris' || req.user.name === 'Darius Robinson' || req.user.name === 'Hunter Norris' || req.user.name === 'Hunter Norris')
    next();
  }
  
  module.exports = {
    requireUser,
  };
  