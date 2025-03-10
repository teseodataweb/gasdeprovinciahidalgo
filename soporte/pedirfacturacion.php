<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Capturar y sanitizar los datos del formulario
    $nombre = htmlspecialchars($_POST["nombre"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $correo = filter_var($_POST["correo"], FILTER_SANITIZE_EMAIL);
    $direccion = htmlspecialchars($_POST["direccion"]);
    $razon_social = htmlspecialchars($_POST["razon_social"]);
    $rfc = htmlspecialchars($_POST["rfc"]);
    $forma_pago = htmlspecialchars($_POST["forma_pago"]);
    $uso_cfdi = htmlspecialchars($_POST["uso_cfdi"]);

    // Validaciones
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "Correo inválido.";
        exit;
    }

    if (!preg_match("/^[0-9]{10}$/", $telefono)) {
        echo "Teléfono inválido. Debe contener 10 dígitos numéricos.";
        exit;
    }

    // Configuración del destinatario
    $destinatario = "pachuca.facturacion@gasdeprovincia.com.mx";  // 📩 Reemplaza con el correo real
    $asunto = "Solicitud de Facturación - $nombre";

    // Crear el contenido del correo
    $contenido = "Nueva solicitud de facturación:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Correo Electrónico: $correo\n";
    $contenido .= "Domicilio: $direccion\n";
    $contenido .= "Razón Social: $razon_social\n";
    $contenido .= "RFC: $rfc\n";
    $contenido .= "Forma de Pago: $forma_pago\n";
    $contenido .= "Uso de CFDI: $uso_cfdi\n";

    // Cabeceras del correo con un correo de prueba
    $from_email = "pachuca.facturacion@gasdeprovincia.com.mx"; 
    $cabeceras = "From: $from_email\r\n";
    $cabeceras .= "Reply-To: $correo\r\n";
    $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Manejo de archivos adjuntos (si se sube uno)
    if (!empty($_FILES['documentos']['name'])) {
        $archivo_tmp = $_FILES['documentos']['tmp_name'];
        $nombre_archivo = $_FILES['documentos']['name'];
        $tipo_archivo = mime_content_type($archivo_tmp);
        $contenido_archivo = file_get_contents($archivo_tmp);
        $contenido_archivo_codificado = chunk_split(base64_encode($contenido_archivo));

        // Definir el boundary para el multipart/mixed
        $boundary = md5(time());

        // Ajustar las cabeceras para manejar adjuntos
        $cabeceras .= "MIME-Version: 1.0\r\n";
        $cabeceras .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Cuerpo del mensaje
        $mensaje = "--$boundary\r\n";
        $mensaje .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $mensaje .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $mensaje .= $contenido . "\r\n";

        // Adjuntar archivo
        $mensaje .= "--$boundary\r\n";
        $mensaje .= "Content-Type: $tipo_archivo; name=\"$nombre_archivo\"\r\n";
        $mensaje .= "Content-Disposition: attachment; filename=\"$nombre_archivo\"\r\n";
        $mensaje .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $mensaje .= $contenido_archivo_codificado . "\r\n";
        $mensaje .= "--$boundary--";

        // Enviar correo con adjunto
        $enviado = mail($destinatario, $asunto, $mensaje, $cabeceras);
    } else {
        // Enviar correo sin adjunto
        $enviado = mail($destinatario, $asunto, $contenido, $cabeceras);
    }

    // Verificación y logs
    $log_file = "log_facturacion.txt";
    if ($enviado) {
        file_put_contents($log_file, "Correo enviado con éxito a $destinatario\n", FILE_APPEND);
        header("Location: confirmacion.html");
        exit;
    } else {
        file_put_contents($log_file, "Error al enviar correo a $destinatario\n", FILE_APPEND);
        echo "Error al enviar la solicitud de facturación.";
    }
} else {
    echo "Acceso no autorizado.";
}
?>
