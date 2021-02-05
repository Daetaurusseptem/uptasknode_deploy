const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");
require('dotenv').config({path:'variables.env'})

//helpers con algunas funciones
const helpers = require("./helpers");

//crear conexion a la dB
const db = require("./config/db");

//importar modelo
require("./models/Proyectos.js");
require("./models/Tareas.js");
require("./models/Usuarios.js");

db.sync()
  .then(() => {
    console.log("Conectado al servidor");
  })
  .catch((e) => console.log(e));

//crear una app de express
const app = express();

//donde cargar los archivos estaticos
app.use(express.static("public"));
// Habilitar pug view engine
app.set("view engine", "pug");

//habilitar body parser para ver datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

//anadir carpeta de las vistas/view
app.set("views", path.join(__dirname, "./views"));

//agregar flash messages
app.use(flash());

app.use(cookieParser());

//sesiones permiten navegar por distintas paginas sin volvernos a autenticar
app.use(
  session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false,
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//variables locales, que se exportan
app.use((req, resp, next) => {
  resp.locals.usuario = {...req.user} || null
  resp.locals.year = 2021;
  resp.locals.vardump = helpers.vardump;
  resp.locals.mensajes = req.flash();
  next();
});

//ruta para el home
app.use("/", routes());

//Servidor y puerto
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080

app.listen(port, host, ()=>{
  console.log('El servidor funciona');
})

require('./handlers/email');
