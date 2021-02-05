"use strict";

var express = require('express');

var router = express.Router(); //importar express validator

var _require = require('express-validator/check'),
    body = _require.body;

var proyectosController = require('../controllers/proyectosController');

var tareasController = require('../controllers/tareasController');

var usuariosController = require('../controllers/usuariosController');

var authController = require('../controllers/authController');

module.exports = function () {
  router.get('/', authController.usuarioAutenticado, proyectosController.proyectosHome);
  router.get('/nuevo-proyecto', authController.usuarioAutenticado, proyectosController.formularioProyecto);
  router.post('/nuevo-proyecto', authController.usuarioAutenticado, body('nombre').not().isEmpty().trim().escape(), proyectosController.nuevoProyecto); //Listar proyecto

  router.get('/proyectos/:url', authController.usuarioAutenticado, proyectosController.proyectoPorUrl); //editar proyecto

  router.get('/proyecto/editar/:id', authController.usuarioAutenticado, proyectosController.formularioEditar); //editar el registro

  router.post('/nuevo-proyecto/:id', authController.usuarioAutenticado, proyectosController.actualizarProyecto);
  router["delete"]('/proyectos/:url', authController.usuarioAutenticado, proyectosController.eliminarProyecto); // Agregar Tarea

  router.post('/proyectos/:url', authController.usuarioAutenticado, tareasController.agregarTarea); //Actualizar tarea

  router.patch('/tareas/:id', authController.usuarioAutenticado, tareasController.cambiarEstadoTarea); //tarea eliminar

  router["delete"]('/tareas/:id', authController.usuarioAutenticado, tareasController.eliminarTarea); //Crear nuevo usuario ruta

  router.get('/crear-cuenta', usuariosController.formCrearCuenta); //Crear usuario 

  router.post('/crear-cuenta', usuariosController.crearCuenta); //Iniciar Sesion

  router.get('/iniciar-sesion', usuariosController.iniciarSesion); //logeo

  router.post('/iniciar-sesion', authController.autenticarUsuario); //cerrar sesion

  router.get('/cerrar-sesion', authController.cerrarSesion); //Recuperar password

  router.get('/restablecer', usuariosController.formRestablecer);
  router.post('/restablecer', authController.enviarToken);
  router.get('/restablecer/:token', authController.resetPassword);
  return router;
};