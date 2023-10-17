<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$response = ["status" => false, "message" => ""];
$token = ($data['token']);
if (!isset($token)) {
    $response["message"] = "Token is not present";
    echo json_encode($response);
    exit;
}
try {
    $query = "delete from tokens where token=?";
    $stmt = $pdo->prepare($query);
    if ($stmt->execute([$token])) {
        $response["status"] = true;
        $response["message"] = "Session Expired";
        echo json_encode($response);
    }
} catch (\Exception $e) {
    $response["status"] = false;
    $response["message"] = "Error:Something went wrong";
    echo json_encode($response);
}
