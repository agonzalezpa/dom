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
$nombre = htmlspecialchars(trim($_POST['nombre'] ?? $_POST['name'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$pais = htmlspecialchars(trim($_POST['pais'] ?? ''));
$empresa = htmlspecialchars(trim($_POST['empresa'] ?? ''));
$fecha = htmlspecialchars(trim($_POST['fecha'] ?? ''));
$fechaCliente = htmlspecialchars(trim($_POST['fechaCliente'] ?? ''));
$timezonecliente = htmlspecialchars(trim($_POST['timezonecliente'] ?? ''));
$telefono = htmlspecialchars(trim($_POST['phone'] ?? ''));
$meetingType = htmlspecialchars(trim($_POST['meetingType'] ?? ''));
$language = htmlspecialchars(trim($_POST['language'] ?? ''));
$mensaje = htmlspecialchars(trim($_POST['mensaje'] ?? $_POST['message'] ?? ''));
$invitados = htmlspecialchars(trim($_POST['invitados'] ?? '')); // Será una cadena tipo "correo1@x.com,correo2@x.com"

// Validación básica
if (!$nombre || !$email || !$fecha || !$pais || !$meetingType) {
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

function sendmailToclient($email, $nombre, $fecha, $language, $timezonecliente)
{
    // Mensaje según idioma
    if ($language === 'en') {
        $greeting = "Dear " . htmlspecialchars($nombre) . ",";
        $intro = "We have received your appointment request for <strong>" . htmlspecialchars($fecha) . " (" . htmlspecialchars($timezonecliente) . ") </strong>.<br>We will be punctual to discover how we can help you and provide the best solution.";
    } else {
        $greeting = "Hola " . htmlspecialchars($nombre) . ",";
        $intro = "Hemos recibido tu solicitud de cita para el <strong>" . htmlspecialchars($fecha) . " (" . htmlspecialchars($timezonecliente) . ") </strong>.<br>Estaremos puntuales para descubrir cómo podemos ayudarte y brindarte la mejor solución.";
    }

    $client_message = <<<HTML
<div id="editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div id="v1editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div id="v1v1editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div id="v1v1v1editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div id="v1v1v1v1editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div id="v1v1v1v1v1editbody1" style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;">
<div class="v1v1v1v1v1v1v1v1email-wrapper">
<table border="0" width="100%" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td align="center">
<table class="v1v1v1v1v1v1v1v1email-container" style="max-width: 600px; background-color: #1e293b; border-radius: 16px; border: 1px solid #334155;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="v1v1v1v1v1v1v1v1header" style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); background-color: #6366f1; padding: 30px 40px; text-align: center;">
<div class="v1v1v1v1v1v1v1v1logo" style="font-size: 32px; font-weight: bold; color: white; margin: 0; padding: 0; line-height: 1.2;">DOM LLC</div>
<div class="v1v1v1v1v1v1v1v1tagline" style="font-size: 14px; color: rgba(255,255,255,0.9); margin-top: 8px; font-weight: 300;">Soluciones Digitales Personalizadas</div>
</td>
</tr>
<tr>
<td class="v1v1v1v1v1v1v1v1content" style="padding: 40px; background-color: #1e293b;">
<div class="v1v1v1v1v1v1v1v1greeting" style="font-size: 18px; font-weight: 500; color: #6366f1; margin-bottom: 25px;">{$greeting}</div>
<div class="v1v1v1v1v1v1v1v1intro" style="font-size: 16px; line-height: 1.6; color: #cbd5e1; margin-bottom: 25px;">{$intro}</div>
</td>
</tr>
<tr>
<td class="v1v1v1v1v1v1v1v1footer" style="background-color: #0f172a; padding: 30px 40px; border-top: 1px solid #334155;">
<table class="v1v1v1v1v1v1v1v1footer-table" style="width: 100%; border-collapse: collapse;" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td>
<div class="v1v1v1v1v1v1v1v1contact-info" style="text-align: left;"><a class="v1v1v1v1v1v1v1v1contact-item" style="color: #94a3b8; font-size: 14px; text-decoration: none; display: block; margin-bottom: 5px;" href="https://dom0125.com" target="_blank" rel="noopener noreferrer">🌐 dom0125.com</a> <a class="v1v1v1v1v1v1v1v1contact-item" style="color: #94a3b8; font-size: 14px; text-decoration: none; display: block; margin-bottom: 5px;" href="mailto:info@dom0125.com" rel="noreferrer">📧 info@dom0125.com</a> <a class="v1v1v1v1v1v1v1v1contact-item" style="color: #94a3b8; font-size: 14px; text-decoration: none; display: block; margin-bottom: 5px;" href="https://wa.me/+15793810079" target="_blank" rel="noopener noreferrer">📱 +1 (579) 381-0079</a>
<p style="color: #94a3b8;">4315 Neely Ave, Midland Texas. United States</p>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
HTML;

    $client_subject = ($language === 'en')
        ? "Thank you for your booking at DOM!"
        : "¡Gracias por tu reserva en DOM!";

    $client_headers  = "MIME-Version: 1.0\r\n";
    $client_headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $client_headers .= "From: DOM <info@dom0125.com>\r\n";

    mail($email, $client_subject, $client_message, $client_headers);
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
    //$headers .= "Cc: agonzalezpa0191@gmail.com\r\n"; 
    // Agrega copias
    $headers .= "Cc: odelkysi92@gmail.com, agonzalezpa0191@dgmail.com\r\n";
    mail($admin_email, $subject, $body, $headers);
    sendmailToclient($email, $nombre, $fechaCliente, $language, $timezonecliente);

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
