const express = require ('express');
const router = express.Router();

//importar express validator

const {body}=require('express-validator/check')


const proyectosController = require('../controllers/proyectosController')
const tareasController = require('../controllers/tareasController')
const usuariosController = require('../controllers/usuariosController')
const authController = require('../controllers/authController')

module.exports = function(){
    router.get('/', 
                authController.usuarioAutenticado,
                proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', 
                authController.usuarioAutenticado,
                proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto',
                authController.usuarioAutenticado,
                body('nombre').not().isEmpty().trim().escape(), 
                proyectosController.nuevoProyecto
               );
   
    
    //Listar proyecto
    router.get('/proyectos/:url',
                authController.usuarioAutenticado, 
                proyectosController.proyectoPorUrl)
    //editar proyecto
    router.get('/proyecto/editar/:id', 
                authController.usuarioAutenticado,
                proyectosController.formularioEditar)
    //editar el registro
    router.post('/nuevo-proyecto/:id',
                authController.usuarioAutenticado,
                proyectosController.actualizarProyecto);

    router.delete('/proyectos/:url',  
                authController.usuarioAutenticado,
                proyectosController.eliminarProyecto);

    // Agregar Tarea
    router.post('/proyectos/:url', 
                authController.usuarioAutenticado,
                tareasController.agregarTarea);
    //Actualizar tarea
    router.patch('/tareas/:id', 
                authController.usuarioAutenticado,
                tareasController.cambiarEstadoTarea)
    //tarea eliminar
    router.delete('/tareas/:id', 
                authController.usuarioAutenticado,
                tareasController.eliminarTarea)

    //Crear nuevo usuario ruta
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    //Crear usuario 
    router.post('/crear-cuenta', usuariosController.crearCuenta);

    //Iniciar Sesion
    router.get('/iniciar-sesion', usuariosController.iniciarSesion);
    //logeo
    router.post('/iniciar-sesion', authController.autenticarUsuario);
    //cerrar sesion
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //Recuperar password
    router.get('/restablecer', usuariosController.formRestablecer);

    router.post('/restablecer', authController.enviarToken);
    
    router.get('/restablecer/:token', authController.validarToken);
    
    router.post('/restablecer/:token', authController.actualizarPassword);
    //confirmacion de cuenta link enviado al correo
    router.get('/confirmar/:email', usuariosController.registrarUsuario);

    
    return router;
}