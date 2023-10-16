<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
include 'connectdb.php';
$response = ["status"=>false,"message"=>""];
$json_data = file_get_contents("php://input");
$data = json_decode($json_data, true);
$checkIds=$data['checkIds'];
if(sizeof($checkIds)>0){
foreach($checkIds as $key=>$value){
$query="delete from salaries where id=?";
$stmt=$pdo->prepare($query);
$stmt->execute([$value]);
}
$response['status']=true;
$response['message']="deleted successfully";
}
else{
    $response["message"]="please select rows";
}
echo json_encode($response);