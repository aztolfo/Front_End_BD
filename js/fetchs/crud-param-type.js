$(document).ready(function () {
    var apiKey = "EXaR0JoKIirohPwbRPIHc3s73Oygi0XV";
    var apiUrl = "http://localhost/api/public/api/paramTypes";
    var tabla = $("#tabletpr");


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
                        <td>${data.data[i].name}</td>
                        <td>${data.data[i].range_min}</td>
                        <td>${data.data[i].range_max}</td>
                
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
