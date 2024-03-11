<?php
require '../dbcon.php';
require_once '../config.php';

if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['status']) && isset($_POST['role']))
{
    $first_name = mysqli_real_escape_string($con, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($con, $_POST['last_name']);
    $status = mysqli_real_escape_string($con, $_POST['status']);
    $role = mysqli_real_escape_string($con, $_POST['role']);

    $errors = array();
    if(empty($first_name)) {
        $errors[] = 'First name';
    }
    if(empty($last_name)) {
        $errors[] = 'Last name';
    }
    if($role === '-Please-select-') {
        $errors[] = 'Role';
    }

    if(!empty($errors))
    {
        $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'Following fields are required: ' . implode(', ', $errors)));
        echo json_encode($response);
    } else {
        $query = "INSERT INTO users (first_name, last_name, status, role) VALUES ('$first_name', '$last_name', '$status', '$role')";

        if (mysqli_query($con, $query)) {
            $userData = array(
                'id' => mysqli_insert_id($con),
                'first_name' => $first_name,
                'last_name' => $last_name,
                'status' => $status,
                'role' => $roles[$role],
                'role_id' => $role
            );
            $response = array('status' => true, 'error' => null ,'userData' => $userData);
            echo json_encode($response);
        } else {
            $response = array('status' => false, 'error' => array('code' => 500, 'message' => 'Failed to add user'));
            echo json_encode($response);
        }
    }
} else {
    $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'Missing required fields'));
    echo json_encode($response);
}