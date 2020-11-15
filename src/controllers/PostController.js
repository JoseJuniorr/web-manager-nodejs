const PostController = {};

const Post = require("../models/Post");
const User = require("../models/User");

const cloudinary = require("../cloudinary");

PostController.renderIndexPage = async (req, res) => {
  await Post.find({})
    .populate("author")
    .sort({ createdAt: "desc" })
    .then((posts) => {
      res.render("posts/index", { title: "Posts", posts: posts });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Erro ao carregar a lista de posts!");
    });
};

PostController.show = async (req, res) => {
  await Post.findById(req.params.id)
    .populate("author")
    .then((post) => {
      res.render("posts/show", { title: post.title, post: post });
    })
    .catch((err) => {
      req.flash("error_msg", "erro ao carregar a publicação");
      res.redirect("/posts");
    });
};

PostController.renderListPost = async (req, res) => {
  await Post.find({})
    .populate("author")
    .then((posts) => {
      res.render("posts/list-posts", { title: "Lista de Posts", posts: posts });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Erro ao carregar a lista de posts!");
    });
};

PostController.renderFormNewPost = (req, res) => {
  res.render("posts/new-post", { title: "Novo Post" });
};

PostController.createPost = async (req, res) => {
  req.body.images = [];

  for (const file of req.files) {
    const image = cloudinary.v2.uploader.upload(file.path);

    req.body.images.push({
      url: (await image).secure_url,
      public_id: (await image).public_id,
    });
  }

  const { title, description, content, images } = req.body;
  const author = req.user._id;
  const post = new Post({
    title,
    description,
    content,
    images,
    author,
  });

  await post
    .save()
    .then(() => {
      req.flash("success_msg", "Post cadastrado com sucesso!");
      res.redirect("/adm/dashboard");
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao salvar o post!");
      res.redirect("/posts/new-post");
      console.log(err);
    });
};

PostController.renderFormEditPost = async (req, res) => {
  await Post.findById(req.params.id)
    .then((post) => {
      res.render("posts/edit-post", { title: "Editar Post", post: post });
    })
    .catch((err) => {
      console.log(err);
      req.flash("error_msg", "Erro ao carregar o post!");
      res.redirect("/posts/list-posts");
    });
};

module.exports = PostController;
