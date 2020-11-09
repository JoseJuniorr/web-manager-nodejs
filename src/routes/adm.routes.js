const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  renderDashboard,
  renderListUsers,
  renderEditUser,
} = require("../controllers/AdmController");

router.get("/dashboard", isAuthenticated, renderDashboard);

router.get("/list-users", isAuthenticated, renderListUsers);

router.get("/edit-user/:id", isAuthenticated, renderEditUser);

router.put("/update-user/:id", isAuthenticated);

module.exports = router;
