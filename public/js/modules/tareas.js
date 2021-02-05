import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from "../functions/avance.js";

const tareas = document.querySelector(".listado-pendientes");

if (tareas) {
  //delegation

  tareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icono = e.target;
      const idTarea = icono.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;
      axios.patch(url, { idTarea }).then(function (resp) {
        if (resp.status === 200) {
          icono.classList.toggle("completo");
          actualizarAvance();
        }
      });
    } else if (e.target.classList.contains("fa-trash")) {
      const tareaHTML = e.target.parentElement.parentElement;
      const idTarea = tareaHTML.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            axios.delete(url, { params: { idTarea } }).then(function (resp) {
              if (resp.status === 200) {
                tareaHTML.parentElement.removeChild(tareaHTML);

                Swal.fire({
                  title: "Task Deleted",
                  text: resp.data,
                  icon: "success",
                });

                actualizarAvance();
              }
            });
          }
        })
        .catch(() => {
          Swal.fire({
            type: "error",
            title: "Hubo un error",
            text: "No se pudo eliminar",
          });
        });
    }
  });
}

export default tareas;
