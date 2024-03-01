<?php

require '../dbcon.php';

if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['status']) && isset($_POST['role']))
{
    $first_name = mysqli_real_escape_string($con, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($con, $_POST['last_name']);
    $status = mysqli_real_escape_string($con, $_POST['status']);
    $role = mysqli_real_escape_string($con, $_POST['role']);

    if(empty($first_name) || empty($last_name) || empty($role))
    {
        $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'All fields are required'));
        echo json_encode($response);
    } else {
        $query = "INSERT INTO users (first_name, last_name, status, role) VALUES ('$first_name', '$last_name', '$status', '$role')";

        if (mysqli_query($con, $query)) {
            $response = array('status' => true, 'message' => 'User added successfully');
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