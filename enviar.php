<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") { 

if (!empty($_POST['verificacion_segura'])) { 
http_response_code(400); 
exit("Acceso denegado."); 
} 

/* ==========================
   CONFIGURACIÓN
========================== */

$destinatario = "contacto@cortinasaab.com.ar";
$asunto = "Nueva Solicitud desde CortinasAAB.com.ar";

/* ==========================
   LIMPIEZA DE DATOS
========================== */

function limpiar($dato)
{
    return htmlspecialchars(strip_tags(trim($dato)));
}

$nombre   = limpiar($_POST['nombre'] ?? '');
$telefono = limpiar($_POST['telefono'] ?? '');
$email    = limpiar($_POST['email'] ?? '');
$mensaje  = limpiar($_POST['mensaje'] ?? '');

/* ==========================
   VALIDACIONES
========================== */

$errores = [];

if (empty($nombre)) {
    $errores[] = "Nombre requerido";
}

if (empty($telefono)) {
    $errores[] = "Teléfono requerido";
}

if (empty($email)) {
    $errores[] = "Email requerido";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "Email inválido";
}

if (empty($mensaje)) {
    $errores[] = "Mensaje requerido";
}

if (!empty($errores)) {

    echo "
    <script>
        alert('Por favor complete todos los campos correctamente.');
        window.history.back();
    </script>
    ";

    exit();
}

/* ==========================
   CONTENIDO DEL EMAIL
========================== */

$cuerpo = "
Nueva solicitud recibida desde CortinasAAB.com.ar

----------------------------------

Nombre:
$nombre

Teléfono:
$telefono

Email:
$email

Mensaje:
$mensaje

----------------------------------

Fecha:
" . date("d/m/Y H:i:s") . "

IP:
" . $_SERVER['REMOTE_ADDR'] . "
";

/* ==========================
   CABECERAS
========================== */

$headers  = "From: Cortinas AAB <contacto@cortinasaab.com.ar>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

/* ==========================
   ENVÍO
========================== */

if (mail($destinatario, $asunto, $cuerpo, $headers)) {
}
    echo "
    <!DOCTYPE html>
    <html lang='es'>
    <head>
        <meta charset='UTF-8'>
        <title>Mensaje enviado</title>

        <style>

        body{
            font-family:Arial,sans-serif;
            background:#f5f7fa;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100vh;
            margin:0;
        }

        .box{
            background:#fff;
            padding:40px;
            border-radius:12px;
            text-align:center;
            box-shadow:0 10px 30px rgba(0,0,0,.1);
            max-width:500px;
        }

        h1{
            color:#0d4ed8;
            margin-bottom:15px;
        }

        p{
            color:#444;
            line-height:1.6;
        }

        a{
            display:inline-block;
            margin-top:20px;
            background:#0d4ed8;
            color:white;
            text-decoration:none;
            padding:12px 25px;
            border-radius:8px;
        }

        </style>

    </head>
    <body>

        <div class='box'>

            <h1>✓ Solicitud enviada</h1>

            <p>
            Gracias por contactarnos.<br>
            Recibimos tu consulta correctamente.
            </p>

            <a href='index.html'>Volver al sitio</a>

        </div>

    </body>
    </html>
    ";

} else {

    echo "
    <script>
        alert('Error al enviar el formulario. Intente nuevamente.');
        window.history.back();
    </script>
    ";

}

?>