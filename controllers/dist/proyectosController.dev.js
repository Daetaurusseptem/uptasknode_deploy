"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var slug = require("slug");

var Proyectos = require("../models/Proyectos");

var Tareas = require("../models/Tareas");

exports.proyectosHome = function _callee(req, resp) {
  var usuarioId, proyectos;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          usuarioId = resp.locals.usuario.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context.sent;
          resp.render("index", {
            nombrePagina: "Proyectos",
            proyectos: proyectos
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.formularioProyecto = function _callee2(req, resp) {
  var usuarioId, proyectos;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          usuarioId = resp.locals.usuario.id;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context2.sent;
          resp.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            proyectos: proyectos
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.nuevoProyecto = function _callee3(req, resp) {
  var nombre, errores, usuarioId;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          //validar input
          nombre = req.body.nombre;
          errores = [];

          if (!nombre) {
            errores.push({
              texto: "Agrega un nombre al proyecto"
            });
          }

          if (!(errores.length > 0)) {
            _context3.next = 7;
            break;
          }

          resp.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores: errores
          });
          _context3.next = 11;
          break;

        case 7:
          usuarioId = resp.locals.usuario.id;
          _context3.next = 10;
          return regeneratorRuntime.awrap(Proyectos.create({
            nombre: nombre,
            usuarioId: usuarioId
          }));

        case 10:
          resp.redirect("/");

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.proyectoPorUrl = function _callee4(req, resp, next) {
  var usuarioId, proyectosPromise, proyectoPromise, _ref, _ref2, proyecto, proyectos, tareas;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          usuarioId = resp.locals.usuario.id;
          proyectosPromise = Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          });
          proyectoPromise = Proyectos.findOne({
            where: {
              url: req.params.url,
              usuarioId: usuarioId
            }
          });
          _context4.next = 5;
          return regeneratorRuntime.awrap(Promise.all([proyectoPromise, proyectosPromise]));

        case 5:
          _ref = _context4.sent;
          _ref2 = _slicedToArray(_ref, 2);
          proyecto = _ref2[0];
          proyectos = _ref2[1];
          _context4.next = 11;
          return regeneratorRuntime.awrap(Tareas.findAll({
            where: {
              ProyectoId: proyecto.id
            },
            include: [{
              model: Proyectos
            }]
          }));

        case 11:
          tareas = _context4.sent;

          if (proyecto) {
            _context4.next = 14;
            break;
          }

          return _context4.abrupt("return", next());

        case 14:
          resp.render("tareas", {
            nombrePagina: "Tareas del proyecto",
            proyecto: proyecto,
            proyectos: proyectos,
            tareas: tareas
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  });
};

exports.formularioEditar = function _callee5(req, resp, next) {
  var usuarioId, proyectosPromise, proyectoPromise, _ref3, _ref4, proyecto, proyectos;

  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          usuarioId = resp.locals.usuario.id;
          proyectosPromise = Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          });
          proyectoPromise = Proyectos.findOne({
            where: {
              id: req.params.id,
              usuarioId: usuarioId
            }
          });
          _context5.next = 5;
          return regeneratorRuntime.awrap(Promise.all([proyectoPromise, proyectosPromise]));

        case 5:
          _ref3 = _context5.sent;
          _ref4 = _slicedToArray(_ref3, 2);
          proyecto = _ref4[0];
          proyectos = _ref4[1];
          resp.render("nuevoProyecto", {
            nombrePagina: "Editar Proyecto",
            proyecto: proyecto,
            proyectos: proyectos
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.actualizarProyecto = function _callee6(req, resp) {
  var usuarioId, proyectos, nombre, errores;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          usuarioId = resp.locals.usuario.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Proyectos.findAll({
            where: {
              usuarioId: usuarioId
            }
          }));

        case 3:
          proyectos = _context6.sent;
          //validar input
          nombre = req.body.nombre;
          errores = [];

          if (!nombre) {
            errores.push({
              texto: "Agrega un nombre al proyecto"
            });
          }

          if (!(errores.length > 0)) {
            _context6.next = 11;
            break;
          }

          resp.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores: errores,
            proyectos: proyectos
          });
          _context6.next = 14;
          break;

        case 11:
          _context6.next = 13;
          return regeneratorRuntime.awrap(Proyectos.update({
            nombre: nombre
          }, {
            where: {
              id: req.params.id
            }
          }));

        case 13:
          resp.redirect("/");

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.eliminarProyecto = function _callee7(req, resp, next) {
  var urlProyecto, resultado;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          //req es lo que se envia al servidor
          //y query o select son:
          //de axios
          // console.log(req.query);
          //del comodin del routes
          // console.log(req.params);
          urlProyecto = req.query.urlProyecto;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Proyectos.destroy({
            where: {
              url: urlProyecto
            }
          }));

        case 3:
          resultado = _context7.sent;

          if (resultado) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", next());

        case 6:
          resp.status(200).send('Proyecto eliminado correctamente');

        case 7:
        case "end":
          return _context7.stop();
      }
    }
  });
};