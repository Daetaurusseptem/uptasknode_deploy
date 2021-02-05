const slug = require("slug");
const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, resp) => {
  const usuarioId = resp.locals.usuario.id
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
  

  resp.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, resp) => {
  const usuarioId = resp.locals.usuario.id
  const proyectos = await Proyectos.findAll({where:{usuarioId}});

  resp.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, resp) => {
  //validar input

  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  if (errores.length > 0) {
    resp.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
    });
  } else {
    const usuarioId = resp.locals.usuario.id;
    await Proyectos.create({  nombre, usuarioId });
    resp.redirect("/");
  }
};

exports.proyectoPorUrl = async (req, resp, next) => {
  const usuarioId = resp.locals.usuario.id
  const proyectosPromise = Proyectos.findAll({where:{usuarioId}});

  const proyectoPromise = Proyectos.findOne({
    where: {
      url: req.params.url,
      usuarioId
    },
  });
  
  const [proyecto, proyectos] = await Promise.all([
    proyectoPromise,
    proyectosPromise,
  ]);
  //Consultar tareas del proyecto actual
  const tareas = await Tareas.findAll({
    where:{
      ProyectoId:proyecto.id
    },
    include:[
      {model:Proyectos}
    ]
  });

  

  if (!proyecto) return next();

  resp.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyecto,
    proyectos,
    tareas
  });
};

exports.formularioEditar = async (req, resp, next) => {

  const usuarioId = resp.locals.usuario.id
  const proyectosPromise = Proyectos.findAll({where:{usuarioId}});
  const proyectoPromise = Proyectos.findOne({
    where: {
      id: req.params.id,
      usuarioId
    }
  });

  const [proyecto, proyectos] = await Promise.all([
    proyectoPromise,
    proyectosPromise,
  ]);

  resp.render("nuevoProyecto", {
    nombrePagina: "Editar Proyecto",
    proyecto,
    proyectos,
  });
};

exports.actualizarProyecto = async (req, resp) => {
  const usuarioId = resp.locals.usuario.id
  const proyectos = await Proyectos.findAll({where:{usuarioId}});
  //validar input

  const { nombre } = req.body;
  let errores = [];

  if (!nombre) {
    errores.push({ texto: "Agrega un nombre al proyecto" });
  }

  if (errores.length > 0) {
    resp.render("nuevoProyecto", {
      nombrePagina: "Nuevo Proyecto",
      errores,
      proyectos
    });
  } else {
    await Proyectos.update(
      {nombre: nombre},
      {where: { id: req.params.id }}
    ); 
    resp.redirect("/");
  }
};

exports.eliminarProyecto = async(req, resp, next)=>{
  //req es lo que se envia al servidor
  //y query o select son:
  //de axios
  // console.log(req.query);
  //del comodin del routes
  // console.log(req.params);
  const {urlProyecto} = req.query;
  const resultado = await Proyectos.destroy({where:{url:urlProyecto}});

  if(!resultado){

    return next();
  }

  resp.status(200).send('Proyecto eliminado correctamente');


}
