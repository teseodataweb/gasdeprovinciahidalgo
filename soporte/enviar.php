<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $correo = filter_var($_POST["correo"], FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars($_POST["mensaje"]);

    // Validación adicional
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "Correo inválido.";
        exit;
    }

    $destinatario = "pachuca.atencion@gasdeprovincia.com.mx";  // Reemplaza con tu correo real
    $asunto = "Nuevo mensaje de contacto desde la web de Gas de Provincia";
    
    $contenido = "Nombre: $nombre\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Correo Electrónico: $correo\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $correo\r\n";
    $cabeceras .= "Reply-To: $correo\r\n";
    $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        // Redirigir a la página de confirmación
        header("Location: confirmacion.html");
        exit;
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Acceso no autorizado.";
}
?>
