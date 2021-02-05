var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 
//Necesitamos el modelo de usuario para hacer la comprobacion de
//usuarios
var Usuarios = require('../models/Usuarios');
 
// Local Strategy - login con credenciales propias
// Local Strategy - login con credenciales propias
passport.use(
    new LocalStrategy(
        // Nuestro usuario requerira email y password en orden para poder logearse

        {
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            // Cuando un usuario intenta iniciar sesion este codigo es
            //el que corre
            Usuarios.findOne({
                where: {
                    email,
                    activo:1
                    
                }
            }).then(function(usuario) {
                // Si no existe un usuario con el correo
                if (!usuario) {
                    return done(null, false, {
                        message: 'This account does not exist'
                    });
                    
                }
                if (!usuario.validPassword(password)) {
                    // correo correcto pero contrasena incorrecta
                    return done(null, false, {
                        message: 'Wrong Password'
                    });
                }
                // si email y contrasena son correctasa retornaremos el usuario para
                // su uso en una session
                console.log(usuario);
                return done(null, usuario);
            });
        }
    )
);
//
// en orden de mantener la autenticacion a traves de peticiones http,
// sequelize necesita el serializr y deserializar al usuario
// Es un boilerplate
passport.serializeUser(function(usuario, cb) {
    cb(null, usuario);
});
//
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});
//
// exportamos la configuracion del passport para su uso en el middleware
module.exports = passport;
 