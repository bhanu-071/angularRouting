<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);

$response = ["status" => false, "message" => "", "data" => ""];
$userId = $data['token'];
if (!isset($userId) || empty($userId)) {
    $response['status'] = false;
    $response['message'] = "Token can't be empty";
    echo json_encode($response);
    exit;
}
try {
    $query = "select * from tokens t left join userdetails ud on t.user_id=ud.id where t.token=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$userId]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result && $result['id']) {
        $response['status'] = true;
        $response['message'] = $result['email'];
        $response['data'] = "Welcome " . $result['first_name'] . " " . $result['last_name'];
        echo json_encode($response);
        exit;
    } else {
        $response['status'] = false;
        $response['message'] = "User Not Authenticated";
        echo json_encode($response);
        exit;
    }
} catch (\Exception $e) {
    $response["status"] = false;
    $response["message"] = "Error: can't process the request";
    echo json_encode($response);
}
