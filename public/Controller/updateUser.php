<?php
require '../dbcon.php';
require '../config.php';

if(isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['status']) && isset($_POST['role']) && isset($_POST['user_id']))
{
    $user_id = mysqli_real_escape_string($con, $_POST['user_id']);
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
        $query = "UPDATE users SET first_name = '$first_name', last_name = '$last_name', status = '$status', role = '$role' WHERE id = '$user_id'";

        if (mysqli_query($con, $query)) {
            $response = array(
                'status' => true,
                'error' => null,
                'userData' => array(
                    'id' => $user_id,
                    'first_name' => $first_name,
                    'last_name' => $last_name,
                    'status' => $status,
                    'role' => $roles[$role],
                    'role_id' => $role
                )
            );
            echo json_encode($response);
        } else {
            $response = array('status' => false, 'error' => array('code' => 500, 'message' => mysqli_error($con)));
            echo json_encode($response);
        }
    }
}
