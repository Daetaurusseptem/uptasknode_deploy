import Swal from 'sweetalert2';
import axios from 'axios'


const btnEliminar = document.querySelector('#eliminar-proyecto');

if(btnEliminar){

    btnEliminar.addEventListener('click', e=>{
        const urlProyecto = e.target.dataset.proyectoUrl;
        


        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
            const url =`${location.origin}/proyectos/${urlProyecto}`
            //enviar ur
            axios.delete(url, {params:{urlProyecto}})
            .then(function(resp) {
                console.log(resp);
                Swal.fire(
                    'Deleted!',
                    resp.data,
                    'success'
                  )
                  
            })
            .catch(()=>{
                Swal.fire({
                    type:'error',
                    title:'Hubo un error',
                    text:'No se pudo eliminar'    
                }
                  )
            })
            

              
            }
          })
    })    
}


export default btnEliminar;
