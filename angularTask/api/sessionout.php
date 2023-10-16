<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$token = ($data['token']);
$query = "delete from tokens where token=?";
$stmt = $pdo->prepare($query);
if ($stmt->execute([$token])) {
    echo "session expired";
}
?>