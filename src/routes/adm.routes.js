const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  renderDashboard,
  renderListUsers,
} = require("../controllers/AdmController");

router.get("/dashboard", isAuthenticated, renderDashboard);

router.get("/list-users", isAuthenticated, renderListUsers);

module.exports = router;
