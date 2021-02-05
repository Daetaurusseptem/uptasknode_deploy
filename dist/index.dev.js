"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var routes = require("./routes");

var path = require("path");

var bodyParser = require("body-parser");

var flash = require("connect-flash");

var session = require("express-session");

var cookieParser = require("cookie-parser");

var passport = require("./config/passport"); //helpers con algunas funciones


var helpers = require("./helpers"); //crear conexion a la dB


var db = require("./config/db"); //importar modelo


require("./models/Proyectos.js");

require("./models/Tareas.js");

require("./models/Usuarios.js");

db.sync().then(function () {
  console.log("Conectado al servidor");
})["catch"](function (e) {
  return console.log(e);
}); //crear una app de express

var app = express(); //donde cargar los archivos estaticos

app.use(express["static"]("public")); // Habilitar pug view engine

app.set("view engine", "pug"); //habilitar body parser para ver datos del formulario

app.use(bodyParser.urlencoded({
  extended: true
})); //anadir carpeta de las vistas/view

app.set("views", path.join(__dirname, "./views")); //agregar flash messages

app.use(flash());
app.use(cookieParser()); //sesiones permiten navegar por distintas paginas sin volvernos a autenticar

app.use(session({
  secret: "supersecreto",
  resave: false,
  saveUninitialized: false
})); //passport

app.use(passport.initialize());
app.use(passport.session()); //variables locales, que se exportan

app.use(function (req, resp, next) {
  resp.locals.usuario = _objectSpread({}, req.user) || null;
  resp.locals.year = 2021;
  resp.locals.vardump = helpers.vardump;
  resp.locals.mensajes = req.flash();
  next();
}); //ruta para el home

app.use("/", routes());
app.listen(3000);