$(function() {
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
        on_hora = on_hora.replace(/\s/g,'');
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
            var datos = '&on_centro=' + on_centro + '&on_pro=' + on_pro + '&on_pac=' + on_pac + '&on_dni=' + on_dni + '&on_fecha=' + on_fecha + '&on_hora=' + on_hora + '&on_obra=' + on_obra + '&on_tel=' + on_tel;
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
