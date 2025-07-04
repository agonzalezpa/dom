<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set recipient email
    $to = "info@dom0125.com";
    
    // Get form data and sanitize inputs
    $name = filter_var(trim($_POST["name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $company = filter_var(trim($_POST["company"]), FILTER_SANITIZE_STRING);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $message = filter_var(trim($_POST["message"]), FILTER_SANITIZE_STRING);
    
    // Check if email is valid
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor ingrese un correo electrónico válido.";
        exit;
    }
    
    // Set email subject
    $subject = "NUEVO MENSAJE: $name de $company";
    
    // Build the email content
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Empresa: $company\n";
    $email_content .= "Telefono: $phone\n\n";
    $email_content .= "Mensaje:\n$message\n";
    
    // Set email headers
    $headers = "From: info.zonacu@gmail.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Attempt to send the email
    if (mail($to, $subject, $email_content, $headers)) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Lo sentimos, ocurrió un error al enviar tu mensaje. Por favor intenta nuevamente.";
    }
} else {
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor intenta nuevamente.";
}
?>

