<?php
$counter_file = "visitas.txt";

// Inicializa si no existe
if (!file_exists($counter_file)) {
    // Formato: visitas|timestamp
    file_put_contents($counter_file, "0|" . time());
}

$data = explode('|', file_get_contents($counter_file));
$count = isset($data[0]) ? (int)$data[0] : 0;
$last_reset = isset($data[1]) ? (int)$data[1] : time();

// Calcula la semana actual (número de semana y año)
$current_week = date('oW');
$last_reset_week = date('oW', $last_reset);

// Si es una nueva semana, resetea el contador
if ($current_week !== $last_reset_week) {
    $count = 1;
    $last_reset = time();
} else {
    $count++;
}

// Guarda el nuevo valor y la fecha de último reset
file_put_contents($counter_file, $count . "|" . $last_reset);

// Devuelve solo el número de visitas
echo $count;
