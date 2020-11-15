const { Router } = require("express");
const router = Router();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { isAuthenticated } = require("../middlewares/isAuthenticated");

const {
  renderIndexPage,
  renderFormNewPost,
  renderListPost,
  createPost,
  show,
  renderFormEditPost,
} = require("../controllers/PostController");

router.get("/", renderIndexPage);

router.get("/list-posts", isAuthenticated, renderListPost);

router.get("/show/:slug/:id", show);

router.get("/new-post", isAuthenticated, renderFormNewPost);

router.post(
  "/create-post",
  upload.array("images", 4),
  isAuthenticated,
  createPost
);

router.get("/edit-post/:id", isAuthenticated, renderFormEditPost);

module.exports = router;
