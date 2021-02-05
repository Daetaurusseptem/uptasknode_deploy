const Proyectos = require('../models/Proyectos')
const Tareas = require('../models/Tareas');



exports.agregarTarea = async(req, resp, next) =>{
//Obtenemos proyecto actual 
    const proyecto = await Proyectos.findOne({
        where:{
            url:req.params.url
        }
    })
    //leer valor del input
    const {tarea} = req.body;
    //Estado id 0 o incompleto
    const estado = 0;
    //id de proyecto padre
    const ProyectoId = proyecto.id;

    const resultado = await Tareas.create({
        tarea,
        estado,
        ProyectoId
    })

    if(!resultado){
        next();
    }
   
    resp.redirect(`/proyectos/${req.params.url}`);    



}


exports.cambiarEstadoTarea = async(req, resp, next)=>{

    const{id}=req.params
    const tarea = await Tareas.findOne({where:{id}})
    
    const estado=0;

    if(tarea.estado==estado){
        tarea.estado=1
    }else{
        tarea.estado=estado
    }

    const resultado = await tarea.save();

    if(!resultado) return next();
    

    resp.status(200).send('Tarea actualizada');
}

exports.eliminarTarea = async(req, resp, next)=>{
    const {id}=req.params
    
    const resultado = await Tareas.destroy({where:{id}})

    if(!resultado) return next();

    resp.status(200).send('Tarea Eliminada')



}