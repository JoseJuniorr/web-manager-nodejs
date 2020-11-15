const { Router } = require("express");
const router = Router();

router.get("/", function (req, res, next) {
  res.render("contato/index", { title: " Posts" });
});

module.exports = router;
