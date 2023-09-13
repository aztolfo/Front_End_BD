$(document).ready(function () {
    var apiKey = "EXaR0JoKIirohPwbRPIHc3s73Oygi0XV";
    var apiUrl = "http://localhost/api/public/api/products/";
    var tabla = $("#tablap");

    
    

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
            if (data.length>0){console.log("data length")}
            let contenido = '';
            console.log(data)



            for (let i = 0; i < data.data.length; i++) {
                contenido += `
                    <tr>    
                        <td>${data.data[i].id}</td>
                        <td>${data.data[i].name}</td>
                        <td>${data.data[i].provider_id}</td>
                        <td>${data.data[i].reference}</td>
                        <td>${data.data[i].price}</td>
                        <td>${data.data[i].discount}</td>
                        <td>${data.data[i].param_size}</td>
                        <td>${data.data[i].param_mark}</td>
                        <td>${data.data[i].param_gender}</td>
                        <td>${data.data[i].param_color}</td>
                        <td>
                            <button class="btn-view btn"><i class="f fa-solid fa-eye"></i></button>
                            <a class="btn-edit btn" href="edit-user-master.php?id=${data.data[i].id}" ><i class="f fa-solid fa-pen-to-square"></i></a>
                            <button class="btn-delete btn"><i class="f fa-solid fa-trash"></i></button>
                        </td>
                    </tr>`;
            }
            tabla.find('tbody').html(contenido);
            tablas();

            console.log('Ya cargué la info');

            return data;
        })
        .catch(error => {
            console.log("hola");
        });

    
});
