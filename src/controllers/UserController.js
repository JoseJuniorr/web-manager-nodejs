const UserController = {};
const passport = require("passport");

const User = require("../models/User");

UserController.renderLoginPage = (req, res, next) => {
  res.render("users/login", { title: "Login" });
};

UserController.postLogin = passport.authenticate("local", {
  failureRedirect: "/users/login",
  successRedirect: "/adm/dashboard",
  failureFlash: true,
});

UserController.renderRegisterForm = (req, res, next) => {
  res.render("users/register", { title: "Regitrar" });
};

UserController.postRegister = async (req, res, next) => {
  const errors = [];

  const { name, email, password, confirm_password } = req.body;

  if (password != confirm_password) {
    errors.push({ text: "As senhas não conferem!" });
  }
  if (password.length < 6) {
    errors.push({ text: "A senha deve ter no mínimo 6 caracteres!" });
  }

  if (errors.length > 0) {
    res.render("users/register", {
      title: "Registrar",
      errors,
      name,
      email,
    });
  } else {
    //se email existe
    const emailExiste = await User.findOne({ email: email });

    if (emailExiste) {
      req.flash("error", "Este e-mail já está em uso!");
      res.redirect("/users/register");
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash("success_msg", "Usuário cadastrado com sucesso!");
      res.redirect("/users/login");
    }
  }
};

UserController.logout = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "Usuário desconectado com sucesso!");
  res.redirect("/users/login");
};

UserController.renderProfile = async (req, res, next) => {
  const profileUser = await User.findById(req.params.id);

  console.log(profileUser);

  res.render("users/profile", { title: "Profile", profileUser: profileUser });
};

module.exports = UserController;
