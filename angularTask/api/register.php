<?php
require_once 'dbConfig.php';
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);
    if ($data !== null) {
        $firstName = $data['firstName'];
        $lastName = $data['lastName'];
        $gender = $data['gender'];
        $phoneNumber = $data['phoneNumber'];
        $dateOfBirth = $data['dateOfBirth'];
        $email = $data['email'];
        $password = md5($data['password']);
    }
}
if (!isset($firstName)) {
    $response['status'] = false;
    $response['message'] = "firstName is not present";
    echo json_encode($response);
    exit;
}
if (!isset($lastName)) {
    $response['status'] = false;
    $response['message'] = "lastName is not present";
    echo json_encode($response);
    exit;
}
if (!isset($gender)) {
    $response['status'] = false;
    $response['message'] = "gender is not present";
    echo json_encode($response);
    exit;
}
if (!isset($phoneNumber)) {
    $response['status'] = false;
    $response['message'] = "phoneNumber is not present";
    echo json_encode($response);
    exit;
}
if (!isset($dateOfBirth)) {
    $response['status'] = false;
    $response['message'] = "dateOfBirth is not present";
    echo json_encode($response);
    exit;
}
if (!isset($email)) {
    $response['status'] = false;
    $response['message'] = "email is not present";
    echo json_encode($response);
    exit;
}
if (!isset($password)) {
    $response['status'] = false;
    $response['message'] = "password is not present";
    echo json_encode($response);
    exit;
}

$response = ["status" => false, "message" => ""];
try {
    $query = "select email from userDetails where email = '$email'";
    $stmt = $pdo->query($query);
    $result = $stmt->fetch();
    if ($result && $result['email']) {
        $response['status'] = false;
        $response['message'] = $email . " already exists";
        echo json_encode($response);
        exit;
    }



    $query = "Insert into userDetails (first_name, last_name, gender, phone_number, date_of_birth, email, password)
VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($query);
    $result = $stmt->execute([$firstName, $lastName, $gender, $phoneNumber, $dateOfBirth, $email, $password]);
    if ($result) {
        $response['status'] = true;
        $response['message'] = "User Successfully Registered";
        echo json_encode($response);
    }
    $query = "select employee_email from employees where employee_email = ? and employee_role= ?";
    $stmt = $pdo->prepare($query);
    $role = 'hr';
    $stmt->execute([$email, $role]);
    $result = $stmt->fetch();

    if ($result && $result['employee_email']) {
        $query = "update userdetails set role='hr' where email = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$email]);
    } else {
        $query = "update userdetails set role='admin' where email = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$email]);
    }
} catch (\Exception $e) {
    $response["status"] = false;
    $response["message"] = "Error: can't process the request";
    echo json_encode($response);
}
