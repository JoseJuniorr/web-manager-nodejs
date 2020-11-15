const { Router } = require("express");
const router = Router();

router.get("/", function (req, res, next) {
  res.render("sobre/index", { title: " Sobre " });
});

module.exports = router;
