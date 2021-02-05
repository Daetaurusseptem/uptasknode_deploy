const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handlers/email");
const { Sequelize } = require("../config/db");

exports.formCrearCuenta = (req, resp, next) => {
  resp.render("crearCuenta", {
    nombrePagina: "Crear una cuenta en Uptask",
  });
};

exports.iniciarSesion = (req, resp, next)=>{

    resp.render('iniciarSesion', {
        nombrePagina:'Iniciar Sesion'
    })

}

exports.crearCuenta = async (req, resp) => {
  const { email, password } = req.body;

  try {
    await Usuarios.create({
      email,
      password,
    });

    //Crear Url para confirmar
    const link = req.headers
    const urlConfirmar = `http://${link}/confirmar/${email}`

    //crear objeto para el handler de email
    const usuario = {email}
    //enviar email
    enviarEmail.enviar({
      usuario,
      subject:'User Confirmation',
      urlConfirmar,
      archivo:'confirmar-usuario'
  
    })
    //redirect to user
    req.flash('correcto', 'Activation link has been sent to your email');
    resp.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((error) => error.message)
    );
    resp.render("crearCuenta", {
      mensajes: req.flash(),
      nombrePagina: "Crear una cuenta en Uptask",
      email,
      password,
    });
  }
};

//Restablecer password

exports.formRestablecer = (req, resp, next)=>{
  
  resp.render('restablecer',{
    nombrePagina:'Change your password'
  })



}

exports.registrarUsuario = async (req, resp, next)=>{
  const email = req.params.email
  const usuario = await Usuarios.findOne({
    where:{
      email
    }
  }
  )
  if(!usuario){
    req.flash('error','Invalid Account')
    resp.redirect('/iniciar-sesion')
  }
  usuario.activo = 1
  await usuario.save();
  req.flash('correcto','Your Account is registered')
  resp.redirect('/iniciar-sesion')
}
