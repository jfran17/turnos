// Funcion que se ejecuta cuando se termina de cargar la web
$(function() {
    // Solicitar Centros
    consulta("on_centro", "");

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
    $(".boton_consulta").click(function() {
        var on_centro  = $("[name=on_centro] option:selected").val();
        on_centro_desc = $("[name=on_centro] option:selected").text();
        on_usr         = $("[name=on_usr]").val();
        on_pass        = $("[name=on_pass]").val();

        // Validar datos
        if (on_centro == "") {
            $("[name=on_centro]").focus();
            return false;
        } else if (on_usr == "") {
            $("[name=on_usr]").focus();
            return false;
        } else if (on_pass == "") {
            $("[name=on_pass]").focus();
            return false;
        } else {
            var datos = '&id_consulta=on_consulta' + '&on_centro=' + on_centro + '&on_centro_desc=' + on_centro_desc + '&on_usr=' + on_usr + '&on_pass=' + on_pass;
            $.ajax({
                type: "POST",
                url: "consulta_turnos.php", /* archivo que procesa la solicitud en el servidor */
                data: datos,
                success: function(result) {
                    // Funcion a ejecutar en caso que el envío sea exitoso
                    //$("#dialog-msj-text").text('Consulta enviada!');
                    $("#dialog-msj").html(result);
                    $("#dialog-msj").dialog( "option", "width", "auto" );
                    $("#dialog-msj").dialog( "option", "height", "auto" );
                    $("#dialog-msj").dialog("open");
                },
                error: function(result) {
                    // Funcion a ejecutar en caso que el envío falle
                    $("#dialog-msj-text").text(result);
                    $("#dialog-msj").dialog("open");
                }
            });

            limpiarFormulario("formConsulta");

            return false;
        }
    });
});
