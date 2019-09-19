import Swal from 'sweetalert2';

export const actualizarAvance = () => {
    //Seleccionar las tareas existentes
    const tareas = document.querySelectorAll('li.tarea');

    if(tareas.length){
    //seleccionar las tareas completadas
        const tareasCompletas = document.querySelectorAll('i.completo');

    //calcular el avance
        const avance = Math.round((tareasCompletas.length / tareas.length) * 100);

    //mostrar el avance
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance+'%';

        
        if(avance === 100){
            Swal.fire(
                'Completaste el Proyecto',
                'Felicidades, has terminado tus tareas',
                'success'
            )
        }
        else if(avance === 50){
            Swal.fire(
                'Ya estás en el 50% del Proyecto',
                'Tu puedes, Falta poco',
                'success'
            ) 
        }
    }

}