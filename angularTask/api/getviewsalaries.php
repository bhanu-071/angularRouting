<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$id=$data['id'];
$response = [];
$query = "select *
from salaries s
    left join earnings e on e.employee_id = s.employee_id
    left join deductions d on d.employee_id = s.employee_id
    left join employees emp on emp.id=s.employee_id
    left join companies cmp on cmp.id= emp.company_id where s.id=?";
$stmt = $pdo->prepare($query);
$stmt->execute([$id]);
$response = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($response);