/*
    Llena una lista con los resultados de la consulta.

    @param {string} nombre: Nombre de la lista.
    @param {object} result: Resultados devueltos por la consulta.
*/
function llenarLista(nombre, result){
    var nombre_lista = "[name=" + nombre + "]";
    var html = "<option></option>";
    var lista = result.split("|");

    for(var i = 0; i < (lista.length - 1); i++) {
        if((i % 2) == 0) {
            html += "<option value=\"" + lista[i] + "\">";
        }
        else {
            html += lista[i] + "</option>";
        }
    }

    $(nombre_lista).html(html);
}

/*
    Llena una lista con los resultados de la consulta parseados en JSON.

    @param {string} nombre: Nombre de la lista.
    @param {object} result: Resultados devueltos por la consulta.
*/
function llenarListaJSON(nombre, result){
    var nombre_lista = "[name=" + nombre + "]";
    var html = "<option></option>";
    var lista = JSON.parse(result);
    var idx;

    for(idx in lista) {
        html += "<option value=\"" + lista[idx]["id_med"] + "\">" + lista[idx]["med_desc"] + "</option>";
    }

    $(nombre_lista).html(html);
}

/*
    Limpia un formulario.

    @param {string} id_form: id del formulario a limpiar.
*/
function limpiarFormulario(id_form) {
    var id = "#" + id_form;

    // Limpiar el fromulario
    $(id)[0].reset();

    // Solicitar Centros
    //consulta("on_centro", ""); // TODO: Ver si es necesario
}

/*
function setFecha(result) {}
function setHora(result) {}
*/

function consulta(id_consulta, data) {
    var datos = '&id_consulta=' + id_consulta + '&data=' + data;
    $.ajax({
        type: "POST",
        url: "solicitud_turnos.php", /* archivo que procesa la solicitud en el servidor */
        data: datos,
        success: function(result) {
            switch(id_consulta) {
                case 'on_centro':
                case 'on_espe':
                case 'on_obra':
                    llenarLista(id_consulta, result);
                    break;

                case 'on_pro':
                    llenarListaJSON(id_consulta, result);
                    break;
/*
                case 'on_fecha':
                    setFecha(result);
                    break;

                case 'on_hora':
                    setHora(result);
                    break;
*/
                default:
                    break;
            }
        },
        error: function(result) {
            // Funcion a ejecutar en caso que el envío falle
            $("#dialog-msj-text").text('Ups, hubo un error! Intente mas tarde.');
            $("#dialog-msj").dialog("open");
            limpiarFormulario("formTurnos");
        }
    });
}
