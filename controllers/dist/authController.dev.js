"use strict";

var passport = require('passport');

var Usuarios = require('../models/Usuarios');

var crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/iniciar-sesion'
});

exports.usuarioAutenticado = function (req, res, next) {
  //si usuario autenticado
  if (req.isAuthenticated()) {
    return next();
  } //si no usuario autenticado


  return res.redirect('/iniciar-sesion');
};

exports.cerrarSesion = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/iniciar-sesion');
  });
}; //genera un token si usuario valido


exports.enviarToken = function _callee(req, resp, next) {
  var email, usuario, resetUrl;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //verificar usuario existente
          email = req.body.email;
          _context.next = 3;
          return regeneratorRuntime.awrap(Usuarios.findOne({
            where: {
              email: email
            }
          }));

        case 3:
          usuario = _context.sent;

          if (!usuario) {
            req.flash('error', 'Your email is not registered');
            resp.redirect('/restablecer');
          } //creacion de token


          usuario.token = crypto.randomBytes(20).toString('hex'); //expiracion

          usuario.expiracion = Date.now() + 3600000; //guardar token y expiracion en BD

          usuario.save();
          resetUrl = "http://".concat(req.headers.host, "/restablecer/").concat(usuario.token);
          console.log(resetUrl);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.resetPassword = function _callee2(req, resp) {
  var token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.params.token;
          _context2.next = 3;
          return regeneratorRuntime.awrap(resp.send(token));

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
};