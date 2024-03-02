<?php
require '../dbcon.php';

if(isset($_POST['user_id']))
{
    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);


    if(empty($user_id))
    {
        $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'User not found'));
        echo json_encode($response);
    } else {
        $query = "DELETE FROM users WHERE id = '$user_id'";

        if (mysqli_query($con, $query)) {
            $response = array('status' => true, 'message' => 'User delete successfully');
            echo json_encode($response);
        } else {
            $response = array('status' => false, 'error' => array('code' => 500, 'message' => 'Failed to delete user'));
            echo json_encode($response);
        }
    }
} else {
    $response = array('status' => false, 'error' => array('code' => 400, 'message' => 'Missing user id'));
    echo json_encode($response);
}