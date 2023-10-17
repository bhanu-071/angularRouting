<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require_once 'dbConfig.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$token = $data['token'];
$response = ["status" => false, "data" => "", "message" => ""];
if (!isset($token) || empty($token)) {
    $response["status"] = false;
    $response["message"] = "Error: token can't be empty";
    echo json_encode($response);
    exit;
}
try {
    $query = "select ud.role
from tokens t
    left join userdetails ud on ud.id = t.user_id
where t.token =?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$token]);
    $row = $stmt->fetch();
    if ($row[0] == 'hr') {
        $query = "select cmp.id
    from tokens t
        left join userdetails ud on ud.id = t.user_id
        left join employees emp on emp.employee_email = ud.email
        left join companies cmp on cmp.id = emp.company_id
    where t.token = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$token]);
        $row = $stmt->fetch();
        $companyId = $row[0];
        $query = "select
    s.*,
    e.employee_name,
    cmp.company_name
    from Salaries s
    left join Employees e on s.employee_id = e.id
    left join companies cmp on cmp.id = e.company_id where cmp.id=? order by s.employee_id ASC, s.salary_date DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$companyId]);
    } else {
        $query = "select
s.*,
e.employee_name,
cmp.company_name
from Salaries s
left join Employees e on s.employee_id = e.id
left join companies cmp on cmp.id = e.company_id order by s.employee_id ASC, s.salary_date DESC";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
    }
    $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $response["data"] = $row;
    $response["status"] = true;
    $response["message"] = "Data fetched successfully";
} catch (\Exception $e) {
    $response["status"] = false;
    $response["message"] = "Error: can't fetch records";
}
echo json_encode($response);
