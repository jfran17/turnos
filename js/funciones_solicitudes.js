// Funcion que se ejecuta cuando se termina de cargar la web
$(function() {
    // Solicitar Centros
    consulta("on_centro", "");

    // Solicitar especialidad y O. Social
    // segun el centro seleccionado
    $("[name=on_centro]").change(function(){
        // Obtener el centro seleccionado
        var data = $("[name=on_centro]").val();

        // Solicitar especialidades del centro
        consulta("on_espe", data);

        // Solicitar obra sociales del centro
        consulta("on_obra", data);
    });

    // Solicitar profesionales segun centro
    // y especialidad seleccionados
    $("[name=on_espe]").change(function(){
        // Obtener el centro seleccionado
        var centro = $("[name=on_centro]").val();
        // Obtener la especialidad seleccionada
        var espe = $("[name=on_espe]").val();

        // Guardar datos a enviar
        var data = {on_centro: centro, on_espe: espe};

        // Enviar datos en formato JSON
        var data_to_send = JSON.stringify(data);
        
        // Solicitar profesional
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
        var on_centro = $("[name=on_centro] option:selected").text();
        on_pro   = $("[name=on_pro] option:selected").text();
        on_pac   = $("[name=on_pac]").val();
        on_dni   = $("[name=on_dni]").val();
        on_fecha = $("[name=on_fecha]").val();
        on_hora  = $("[name=on_hora]").val();
        on_hora  = on_hora.replace(/\s/g,'');
        on_obra  = $("[name=on_obra] option:selected").text();
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
                    limpiarFormulario("formTurnos");
                },
                error: function(result) {
                    // Funcion a ejecutar en caso que el envío falle
                    $("#dialog-msj-text").text('Error al enviar la solicitud! Intente nuevamente.');
                    $("#dialog-msj").dialog("open");
                    limpiarFormulario("formTurnos");
                }
            });
            return false;
        }
    });
});
