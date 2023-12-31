var apiKey = "EXaR0JoKIirohPwbRPIHc3s73Oygi0XV";
var apiUrl = "http://localhost/api/public/api/users/";
var tabla = $("#tablam");

function deleteUsers(apiUrl, id, apiKey) {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Deseas desactivar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar.',
        cancelButtonText: 'Cancelar.'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteDataFromAPI(apiUrl, id, apiKey)
                .then(data => {
                    if (data.type == 'error') {
                        // Si el producto ya está desactivado
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Algo salió mal!',
                        })
                        return Promise.reject('El usuario ya ha sido desactivado!');
                    }
                    Swal.fire(
                        'ELIMINADO!',
                        'El usuario ha sido ELIMINADO correctamente',
                        'success'
                    );
                })
                .catch(error => {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    });
                });
        }
    });
}
$(document).ready(function () {

    

    function tablas() {


        if ($.fn.DataTable.isDataTable(tabla)) {
            tabla.DataTable().destroy();
        }

        tabla.DataTable({
            
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-CO.json',
                lengthMenu: "Mostrar _MENU_ registros por página",
                zeroRecords: "No se encontraron resultados - lo siento",
                info: "Mostrando página _PAGE_ de _PAGES_",
                infoEmpty: "No hay registros disponibles",
                infoFiltered: "(filtrados de un total de _MAX_ registros)"
            }
        });
    }
    

    fetchDataFromAPI(apiUrl, apiKey)
        .then(data => {
            let contenido = '';
            for (let i = 0; i < data.data.length; i++) {
                contenido += `
                    <tr>    
                        <td>${data.data[i].id}</td>
                        <td>${data.data[i].first_name}</td>
                        <td>${data.data[i].last_name}</td>
                        <td>${data.data[i].birthday}</td>
                        <td>${data.data[i].address}</td>
                        <td>${data.data[i].param_city}</td>
                        <td>${data.data[i].type_user}</td>
                        <td>${data.data[i].param_gender}</td>
                        <td>${data.data[i].email}</td>
                        <td>${data.data[i].param_rol}</td>
                        <td>${data.data[i].param_state}</td>
                        <td>
                            <a href="profile.php?id=${data.data[i].id}" class="btn-view btn"><i class="f fa-solid fa-eye"></i></a>
                            <a class="btn-edit btn" href="edit-user-master.php?id=${data.data[i].id}" ><i class="f fa-solid fa-pen-to-square"></i></a>
                             <button class="btn-delete btn" onclick="deleteUsers(apiUrl, ${data.data[i].id}, apiKey)"><i class="f fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
            }
            tabla.find('tbody').html(contenido);
            tablas();

            console.log('Ya cargué la info');

            return data;
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });

    
});
