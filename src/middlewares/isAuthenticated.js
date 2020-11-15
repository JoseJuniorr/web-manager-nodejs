module.exports = {
  isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash("error_msg", "Operação não permitida!");
      res.redirect("/users/login?fail=true");
    }
  },
};
