const AdmController = {};

const User = require("../models/User");

AdmController.renderDashboard = (req, res, next) => {
  res.render("adm/dashboard", { title: "Dashboard - ADM" });
};

AdmController.renderListUsers = async (req, res, next) => {
  await User.find({})
    .then((users) => {
      res.render("adm/list-users", {
        title: "Lista de Usuários",
        users: users,
      });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao listar os usuários!");
      res.redirect("/adm/dashboard");
    });
};

AdmController.renderEditUser = async (req, res, next) => {
  await User.findById(req.params.id)
    .then((user) => {
      res.render("adm/edit-user", { title: "Atualizar Usuário", user: user });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Erro ao carregar o usuário!");
      res.redirect("/adm/list-users?update=false");
    });
};
module.exports = AdmController;
