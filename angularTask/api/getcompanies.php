<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$token = $data['token'];
$response = ["status" => false, "data" => "", "message" => ""];
if (!isset($token) || empty($token)) {
    $response["status"] = false;
    $response["message"] = "Error: token can't be empty";
} else {
    try {
        $query = "select ud.role
from tokens t
    left join userdetails ud on ud.id = t.user_id
where t.token =?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$token]);
        $row = $stmt->fetch();
        if ($row[0] == 'hr') {
            try {
                $query = "select cmp.*
    from tokens t
        left join userdetails ud on ud.id = t.user_id
        left join employees emp on emp.employee_email = ud.email
        left join companies cmp on cmp.id = emp.company_id
    where t.token = ?";
                $stmt = $pdo->prepare($query);
                $stmt->execute([$token]);
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response["data"] = $row;
                $response["status"] = true;
                $response["message"] = "Companies successfully fetched";
            } catch (\Exception $e) {
                $response["message"] = "Error: can't get companies";
            }
        } else {
            try {
                $query = "select * from companies";
                $stmt = $pdo->prepare($query);
                $stmt->execute();
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $response["data"] = $row;
                $response["status"] = true;
                $response["message"] = "Companies successfully fetched";
            } catch (\Exception $e) {
                $response["message"] = "Error: can't get companies";
            }
        }
    } catch (\Exception $e) {
        $response["message"] = "Error: can't get companies";
    }
}
echo json_encode($response);
