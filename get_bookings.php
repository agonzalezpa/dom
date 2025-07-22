<?php
// filepath: d:\Salva Sistema anterior\Proyectos\DOM LLC\dom\get_bookings.php
header('Content-Type: application/json');
$db_host = 'localhost';
$db_user = 'u750684196_domllc';
$db_pass = 'Olivera19%';
$db_name = 'u750684196_domllc';

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
if ($conn->connect_error) {
    echo json_encode([]);
    exit;
}

$result = $conn->query("SELECT fecha FROM bookings");
$bookings = [];
while ($row = $result->fetch_assoc()) {
    $bookings[] = $row['fecha'];
}
echo json_encode($bookings);

$conn->close();
?>