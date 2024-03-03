<?php
require '../dbcon.php';

if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['status']) && isset($_POST['role']) && isset($_POST['user_id']))
{
    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);
    $first_name = mysqli_real_escape_string($con, $_POST['first_name']);
    $last_name = mysqli_real_escape_string($con, $_POST['last_name']);
    $status = mysqli_real_escape_string($con, $_POST['status']);
    $role = mysqli_real_escape_string($con, $_POST['role']);

    if(empty($first_name) || empty($last_name) || empty($role))
    {
        $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'All fields are required'));
        echo json_encode($response);
    } else {
        $query = "UPDATE users SET first_name = '$first_name', last_name = '$last_name', status = '$status', role = '$role' WHERE id = '$user_id'";

        if (mysqli_query($con, $query)) {
            $response = array('status' => true, 'message' => 'User updated successfully');
            echo json_encode($response);
        } else {
            $response = array('status' => false, 'error' => array('code' => 500, 'message' => 'Failed to update user'));
            echo json_encode($response);
        }
    }
} else {
    $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'Missing required fields'));
    echo json_encode($response);
}