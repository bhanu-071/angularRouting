<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$id = $data['id'];
$response = ["status" => false, "message" => "", "data" => ""];
if (!isset($id)) {
    $response["status"] = false;
    $response["message"] = "Id can't be empty";
    echo json_encode($response);
    exit;
}
try {
    $query = "select *
from salaries s
    left join earnings e on e.employee_id = s.employee_id
    left join deductions d on d.employee_id = s.employee_id
    left join employees emp on emp.id=s.employee_id
    left join companies cmp on cmp.id= emp.company_id where s.id=?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$id]);
    $response["data"] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["status"] = true;
    $response["message"] = "data successfully fetched";
} catch (\Exception $e) {
    $response["status"] = false;
    $response["message"] = "Error: can't process the request";
}
echo json_encode($response);
