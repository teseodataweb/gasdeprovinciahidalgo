<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST["nombre"]);
    $telefono = htmlspecialchars($_POST["telefono"]);
    $correo = filter_var($_POST["correo"], FILTER_SANITIZE_EMAIL);
    $direccion = htmlspecialchars($_POST["direccion"]);
    $servicio = htmlspecialchars($_POST["servicio"]);
    $cantidad = "";

    // Validación adicional del correo
    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        echo "Correo inválido.";
        exit;
    }

    // Validación de litros para estacionario
    if ($servicio === "estacionario") {
        $litros = intval($_POST["litros"]);
        if ($litros < 1 || $litros > 1000) {
            echo "Cantidad de litros no válida.";
            exit;
        }
        $cantidad = "Litros: $litros";
    }

    // Validación de cilindros
    if ($servicio === "cilindro") {
        $cilindros = htmlspecialchars($_POST["cilindros"]);
        if ($cilindros !== "20kg" && $cilindros !== "30kg") {
            echo "Cilindro seleccionado no válido.";
            exit;
        }
        $cantidad = "Cilindro: $cilindros";
    }

    $destinatario = "pachuca.pedidos@gasdeprovincia.com.mx";  // Reemplaza con tu correo real
    $asunto = "Nuevo Pedido de Gas";

    $contenido = "Nombre: $nombre\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Correo Electrónico: $correo\n";
    $contenido .= "Domicilio: $direccion\n";
    $contenido .= "Tipo de Servicio: $servicio\n";
    $contenido .= "$cantidad\n";

    $cabeceras = "From: $correo\r\n";
    $cabeceras .= "Reply-To: $correo\r\n";
    $cabeceras .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        // Redirigir a la página de confirmación
        header("Location: confirmacion.html");
        exit;
    } else {
        echo "Error al enviar el pedido.";
    }
} else {
    echo "Acceso no autorizado.";
}
?>
