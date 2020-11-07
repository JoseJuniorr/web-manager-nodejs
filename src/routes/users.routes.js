const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get("/login", function (req, res, next) {
  res.render("users/login", { title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/users/login",
    successRedirect: "/adm/dashboard",
    failureFlash: true,
  })
);

router.get("/register", function (req, res, next) {
  res.render("users/register", { title: "Registrar" });
});

module.exports = router;
