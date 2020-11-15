const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middlewares/isAuthenticated");

const {
  renderLoginPage,
  postLogin,
  renderRegisterForm,
  postRegister,
  logout,
  renderProfile,
} = require("../controllers/UserController");

//login page
router.get("/login", renderLoginPage);

router.post("/login", postLogin);

router.get("/register", renderRegisterForm);

router.post("/register", postRegister);

router.get("/logout", logout);

router.get("/profile/:id", isAuthenticated, renderProfile);

router.post("/profile");

module.exports = router;
