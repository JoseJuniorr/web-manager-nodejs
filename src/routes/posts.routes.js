const { Router } = require("express");
const router = Router();

router.get("/", function (req, res, next) {
  res.send("rota post index");
});

module.exports = router;
