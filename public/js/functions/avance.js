

export const actualizarAvance =()=>{
//seleccionar tareas existentes
const tareas = document.querySelectorAll('li.tarea');
if(tareas.length){
    //Seleccionar completas
    const tareasCompletadas = document.querySelectorAll('i.completo');
    //calcular el avance
    const avance = Math.round ((tareasCompletadas.length/tareas.length)*100)
     //mostrar el avance
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = avance+'%'
    
    
}

}
