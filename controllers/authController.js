const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const crypto = require("crypto");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const enviarEmail = require('../handlers/email');

exports.autenticarUsuario = passport.authenticate("local", {

  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash:'Account does not exist'
});

exports.usuarioAutenticado = (req, res, next) => {
  //si usuario autenticado

  if (req.isAuthenticated()) {
    return next();
  }

  //si no usuario autenticado
  return res.redirect("/iniciar-sesion");
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/iniciar-sesion");
  });
};
//genera un token si usuario valido
exports.enviarToken = async (req, resp, next) => {
  //verificar usuario existente
  const { email } = req.body;
  const usuario = await Usuarios.findOne({
    where: {
      email,
    },
  });

  if (!usuario) {
    req.flash("error", "Your email is not registered");
    resp.redirect("/restablecer");
  }
  //creacion de token
  usuario.token = crypto.randomBytes(20).toString("hex");
  //expiracion
  usuario.expiracion = Date.now() + 3600000;

  //guardar token y expiracion en BD
  usuario.save();

  const resetUrl = `http://${req.headers.host}/restablecer/${usuario.token}`;

  //Enviar token al correo
  await enviarEmail.enviar({
    usuario,
    subject:'Password Reset',
    resetUrl,
    archivo:'restablecer-password'


  })
  req.flash('correcto','We have send youn an email, please confirm your password change there')
  resp.redirect('iniciar-sesion')
};

exports.validarToken = async (req, resp) => {
  const token = req.params.token;
  const usuario = await Usuarios.findOne({
    where: {
      token
    },
  });

  if (!usuario) {
    req.flash("error", "User token not valid");
    resp.redirect("/restablecer");
  }

  resp.render("resetPassword", {
    nombrePagina: "change your password",
  });

  // resp.json(usuario)
};

exports.actualizarPassword = async (req, resp, next) => {
  const token = req.params.token;
  const usuario = await Usuarios.findOne({
    where: {
      token,
      expiracion: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash("error", "Token expired");
    resp.redirect("/restablecer");
  }
  
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)); 
  usuario.token = null;
  usuario.expiracion = null;

  await usuario.save();
  req.flash('correcto', 'password changed');
  resp.redirect('/iniciar-sesion');

};


