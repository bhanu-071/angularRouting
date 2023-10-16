<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$id=$data['id'];
$query="select s.*,cmp.company_name,emp.employee_name from salaries s 
left join employees emp on s.employee_id=emp.id
left join companies cmp on cmp.id=emp.company_id 
where s.id=?";
$stmt=$pdo->prepare($query);
$stmt->execute([$id]);
$row = $stmt->fetch();
$response[]=$row;
echo json_encode($response);
