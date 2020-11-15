const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const engine = require("ejs-mate");
const favicon = require("serve-favicon");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const passport = require("passport");
const moment = require("moment");
moment.locale("pt-br");

//pages
const indexRouter = require("./routes/home.routes");
const sobreRouter = require("./routes/sobre.routes");
const contatoRouter = require("./routes/contato.routes");
const postsRouter = require("./routes/posts.routes");
//user
const usersRouter = require("./routes/users.routes");
//adm
const admRouter = require("./routes/adm.routes");

const app = express();

//passport strategy
require("./config/auth");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./database/connection");

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//serve favicon
app.use(favicon(path.join(__dirname, "public", "/images/favicon/favicon.ico")));

//method override
app.use(methodOverride("_method"));

//Express Session
app.use(cookieParser());
app.use(
  session({
    secret: "web-sistema-nodejs",
    resave: true,
    saveUninitialized: true,
  })
);

//Flash messages
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());

//variaveis globais
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.user = req.user || null;
  res.locals.title = "Shop";
  res.locals.moment = moment;
  next();
});

app.use("/", indexRouter);
app.use("/sobre", sobreRouter);
app.use("/contato", contatoRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);
app.use("/adm", admRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
