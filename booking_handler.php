<?php
// Configuración de la base de datos
$db_host = 'localhost';
$db_user = 'u750684196_domllc';
$db_pass = 'Olivera19%';
$db_name = 'u750684196_domllc';

// Configuración de correo
$admin_email = 'info@dom0125.com';

// Recibe los datos del formulario (POST)
$nombre = $_POST['nombre'] ?? '';
$email = $_POST['email'] ?? '';
$pais = $_POST['pais'] ?? '';
$empresa = $_POST['empresa'] ?? '';
$fecha = $_POST['fecha'] ?? '';
$mensaje = $_POST['mensaje'] ?? '';

// Validación básica
if (!$nombre || !$email || !$fecha|| !$mensaje|| !$pais) {
    http_response_code(400);
    echo "Faltan datos obligatorios.";
    exit;
}

// Guarda en la base de datos
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    http_response_code(500);
    echo "Error de conexión a la base de datos.";
    exit;
}

$stmt = $conn->prepare("INSERT INTO bookings (nombre, email, fecha, mensaje, pais,empresa) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $nombre, $email, $fecha, $mensaje, $pais, $empresa);
$stmt->execute();
$stmt->close();
$conn->close();

// Envía notificación por correo
$subject = "Nueva reserva en el calendario";
$body = "Nombre: $nombre\nEmail: $email\nFecha: $fecha\nPais: $pais\nEmpresa: $empresa\nMensaje: $mensaje";
$headers = "From: info@dom0125.com\r\n";
$headers .= "Cc: agonzalezpa0191@dgmail.com\r\n"; // Agrega copias
//$headers .= "Cc: odelkysi92@gmail.com, agonzalezpa0191@dgmail.com\r\n";
mail($admin_email, $subject, $body, $headers);

echo "Reserva recibida correctamente.";
?>