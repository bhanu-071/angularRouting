<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'dbConfig.php';
$response = ["status" => false, "message" => ""];
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$checkIds = $data['checkIds'];
if (!isset($checkIds) || empty($checkIds)) {
    $response["status"] = false;
    $response["message"] = "Error: checkIds can't be empty";
} else if (sizeof($checkIds) > 0) {
    try {
        foreach ($checkIds as $key => $value) {
            $query = "delete from salaries where id=?";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$value]);
        }
        $response['status'] = true;
        $response['message'] = "deleted successfully";
    } catch (\Exception $e) {
        $response["message"] = "error: can't delete records";
    }
} else {
    $response["message"] = "please select rows";
}
echo json_encode($response);
