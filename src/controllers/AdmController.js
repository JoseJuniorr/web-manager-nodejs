const AdmController = {};

AdmController.renderDashboard = (req, res, next) => {
  res.render("adm/dashboard", { title: "Dashboard - ADM" });
};

AdmController.renderListUsers = (req, res, next) => {
  res.render("adm/list-users", { title: "Lista de Usuários" });
};
module.exports = AdmController;
