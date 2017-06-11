function listaCentros(result){
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

    $("[name=on_centro]").html(html);
}

function listaEspecialidades(result){
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

    $("[name=on_espe]").html(html);
}

function listaProfesionales(result){
    var html = "<option></option>";
    var lista = JSON.parse(result);
    var idx;

    for(idx in lista) {
        html += "<option value=\"" + lista[idx]["id_med"] + "\">" + lista[idx]["med_desc"] + "</option>";
    }

    $("[name=on_pro]").html(html);
}

function listaObras(result){
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

    $("[name=on_obra]").html(html);
}

function setFecha(result){}
function setHora(result){}

function consulta(id_consulta, data) {
    var datos = '&id_consulta=' + id_consulta + '&data=' + data;
    $.ajax({
        type: "POST",
        url: "solicitud_turnos.php", /* archivo que procesa la solicitud en el servidor */
        data: datos,
        success: function(result) {
            switch(id_consulta) {
                case 'on_centro':
                    listaCentros(result);
                    break;

                case 'on_espe':
                    listaEspecialidades(result);
                    break;

                case 'on_pro':
                    listaProfesionales(result);
                    break;

                case 'on_obra':
                    listaObras(result);
                    break;

                case 'on_fecha':
                    setFecha(result);
                    break;

                case 'on_hora':
                    setHora(result)
                    break;

                default: break;
            }
        },
        error: function(result) {
            // Funcion a ejecutar en caso que el envío falle
            $("#dialog-msj-text").text('Ups, hubo un error! Intente mas tarde.');
            $("#dialog-msj").dialog("open");
        }
    });
}

$(function() {
    // Solicitar Centros
    consulta("on_centro", "");

    // Buscar especialidad
    $("[name=on_centro]").change(function(){
        var data = $("[name=on_centro]").val();

        consulta("on_espe", data);
        consulta("on_obra", data);
    });

    // Buscar especialidad
    $("[name=on_espe]").change(function(){
        var centro = $("[name=on_centro]").val();
        var espe = $("[name=on_espe]").val();
        var data = {on_centro: centro, on_espe: espe};

        var data_to_send = JSON.stringify(data);
        consulta("on_pro", data_to_send);
    });

    // Pop-Up
    $("#dialog-msj").dialog({
        autoOpen: false,
        show: {
            effect: "fade", /* Efecto al mostrar el pop-up */
            duration: 600 /* Duracion del efecto */
        },
        hide: {
            effect: "fade",
            duration: 600
        }
    });

    // Envío del mensaje
    $(".boton_envio").click(function() {
        var on_centro = $("[name=on_centro]").val();
        on_pro   = $("[name=on_pro]").val();
        on_pac   = $("[name=on_pac]").val();
        on_dni   = $("[name=on_dni]").val();
        on_fecha = $("[name=on_fecha]").val();
        on_hora  = $("[name=on_hora]").val();
        on_hora  = on_hora.replace(/\s/g,'');
        on_obra  = $("[name=on_obra]").val();
        on_tel   = $("[name=on_tel]").val();

        // Validar datos
        if (on_centro == "") {
            $("[name=on_centro]").focus();
            return false;
        } else if (on_pro == "") {
            $("[name=on_pro]").focus();
            return false;
        } else if (on_pac == "") {
            $("[name=on_pac]").focus();
            return false;
        } else if (on_dni == "") {
            $("[name=on_dni]").focus();
            return false;
        } else if (on_fecha == "") {
            $("[name=on_fecha]").focus();
            return false;
        } else if (on_hora == "") {
            $("[name=on_hora]").focus();
            return false;
        } else if (on_obra == "") {
            $("[name=on_obra]").focus();
            return false;
        } else if (on_tel == "") {
            $("[name=on_tel]").focus();
            return false;
        } else {
            var datos = '&id_consulta=on_solicitud' + '&on_centro=' + on_centro + '&on_pro=' + on_pro + '&on_pac=' + on_pac + '&on_dni=' + on_dni + '&on_fecha=' + on_fecha + '&on_hora=' + on_hora + '&on_obra=' + on_obra + '&on_tel=' + on_tel;
            $.ajax({
                type: "POST",
                url: "solicitud_turnos.php", /* archivo que procesa la solicitud en el servidor */
                data: datos,
                success: function(result) {
                    // Funcion a ejecutar en caso que el envío sea exitoso
                    $("#dialog-msj-text").text('Solicitud enviada!');
                    $("#dialog-msj").dialog("open");
                },
                error: function(result) {
                    // Funcion a ejecutar en caso que el envío falle
                    $("#dialog-msj-text").text('Error al enviar la solicitud! Intente nuevamente.');
                    $("#dialog-msj").dialog("open");
                }
            });
            return false;
        }
    });
});
