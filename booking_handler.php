<?php
header('Content-Type: application/json');
// Configuración de la base de datos
$db_host = 'localhost';
$db_user = 'u750684196_domllc';
$db_pass = 'Olivera19%';
$db_name = 'u750684196_domllc';

// Configuración de correo
$admin_email = 'info@dom0125.com';

// Recibe los datos del formulario (POST)
$nombre = $_POST['nombre'] ?? $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$pais = $_POST['pais'] ?? '';
$empresa = $_POST['empresa'] ?? '';
$fecha = $_POST['fecha'] ?? '';
$telefono = $_POST['phone'] ?? '';
$meetingType = $_POST['meetingType'] ?? '';
$language = $_POST['language'] ?? '';
$mensaje = $_POST['mensaje'] ?? $_POST['message'] ?? '';
$invitados = $_POST['invitados'] ?? ''; // Será una cadena tipo "correo1@x.com,correo2@x.com"

// Validación básica
if (!$nombre || !$email || !$fecha || !$pais|| !$meetingType) {
    echo json_encode([
        "success" => false,
        "message" => "Faltan datos obligatorios."
    ]);
    exit;
}

// Guarda en la base de datos
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Error de conexión a la base de datos."
    ]);
    exit;
}

// Prepara y ejecuta la consulta
$stmt = $conn->prepare("INSERT INTO bookings (nombre, email, fecha, telefono, mensaje, pais, empresa, tipo_reunion, idioma, invitados) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssssss", $nombre, $email, $fecha, $telefono, $mensaje, $pais, $empresa, $meetingType, $language, $invitados);
if ($stmt->execute()) {
    // Envía notificación por correo
    $subject = "NUEVA RESERVA DE CITA";
    $body = "Nombre: " . ($nombre ?: "-") . "\n";
    $body .= "Email: " . ($email ?: "-") . "\n";
    $body .= "Fecha: " . ($fecha ?: "-") . "\n";
    $body .= "Pais: " . ($pais ?: "-") . "\n";
    $body .= "Empresa: " . ($empresa ?: "-") . "\n";
    $body .= "Teléfono: " . ($telefono ?: "-") . "\n";
    $body .= "Tipo de reunión: " . ($meetingType ?: "-") . "\n";
    $body .= "Idioma: " . ($language ?: "-") . "\n";
    $body .= "Invitados: " . ($invitados ?: "-") . "\n";
    $body .= "Mensaje: " . ($mensaje ?: "-");
    $headers = "From: info@dom0125.com\r\n";
    $headers .= "Cc: agonzalezpa0191@gmail.com\r\n"; // Agrega copias
    //$headers .= "Cc: odelkysi92@gmail.com, agonzalezpa0191@dgmail.com\r\n";
    mail($admin_email, $subject, $body, $headers);

    echo json_encode([
        "success" => true,
        "message" => "Reserva recibida correctamente."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Error al guardar la reserva."
    ]);
}
$stmt->close();
$conn->close();
