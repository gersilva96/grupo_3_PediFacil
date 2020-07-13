const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const session = require("express-session");
const sassMiddleware = require("node-sass-middleware");

//Middlewares propios
const remember = require("./middlewares/remember");
const getUser = require("./middlewares/getUser");

//Llamo a las rutas
const mainRouter = require("./routes/main");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, '..', 'public'),
  dest: path.join(__dirname, '..', 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(methodOverride('_method'));
app.use(session({secret: "pedifacil", resave: true, saveUninitialized: true}));
app.use(remember);
app.use(getUser);

//Rutas
app.use("/", mainRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  let user = undefined;
  if (req.session.userLogged != undefined) {
    user = req.session.userLogged;
  }
  res.render('error', {user});
});

module.exports = app;
