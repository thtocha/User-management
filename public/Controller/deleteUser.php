<?php
require '../dbcon.php';

if(isset($_POST['user_id']))
{
    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);

    $check_query = "SELECT id FROM users WHERE id = '$user_id'";
    $result = mysqli_query($con, $check_query);

    if (!$result) {
        $response = array('status' => false, 'error' => array('code' => 500, 'message' => mysqli_error($con)));
        echo json_encode($response);
        exit();
    }

    if (mysqli_num_rows($result) === 0) {
        $response = array('status' => false, 'error' => array('code' => 100, 'message' => 'User not found'));
        echo json_encode($response);
        exit();
    }

    $query = "DELETE FROM users WHERE id = '$user_id'";

    if (mysqli_query($con, $query)) {
        $response = array('status' => true, 'error' => null ,'user' => array('user_id' => $user_id));
        echo json_encode($response);
    } else {
        $response = array('status' => false, 'error' => array('code' => 500, 'message' => 'Failed to delete user'));
        echo json_encode($response);
    }
}