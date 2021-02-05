"use strict";

var Usuarios = require("../models/Usuarios");

exports.formCrearCuenta = function (req, resp, next) {
  resp.render("crearCuenta", {
    nombrePagina: "Crear una cuenta en Uptask"
  });
};

exports.iniciarSesion = function (req, resp, next) {
  resp.render('iniciarSesion', {
    nombrePagina: 'Iniciar Sesion'
  });
};

exports.crearCuenta = function _callee(req, resp) {
  var _req$body, email, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Usuarios.create({
            email: email,
            password: password
          }));

        case 4:
          resp.redirect("/iniciar-sesion");
          _context.next = 11;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          req.flash("error", _context.t0.errors.map(function (error) {
            return error.message;
          }));
          resp.render("crearCuenta", {
            mensajes: req.flash(),
            nombrePagina: "Crear una cuenta en Uptask",
            email: email,
            password: password
          });

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
}; //Restablecer password


exports.formRestablecer = function (req, resp, next) {
  resp.render('restablecer', {
    nombrePagina: 'Change your password'
  });
};