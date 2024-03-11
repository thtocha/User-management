<?php
require '../dbcon.php';

if(isset($_POST['action']) && isset($_POST['userIds'])) {
    $action = $_POST['action'];
    $selectedUserIds = $_POST['userIds'];

    foreach ($selectedUserIds as $userId) {
        if (!is_numeric($userId)) {
            continue;
        }

        $check_query = "SELECT id FROM users WHERE id = '$userId'";
        $result = mysqli_query($con, $check_query);

        if (!$result || mysqli_num_rows($result) === 0) {
            $response = array('status' => false, 'error' => 'User not found');
            echo json_encode($response);
            exit();
        }

        switch ($action) {
            case 'active':
                $query = "UPDATE users SET status = 1 WHERE id = $userId";
                break;
            case 'notActive':
                $query = "UPDATE users SET status = 0 WHERE id = $userId";
                break;
            case 'delete':
                $query = "DELETE FROM users WHERE id = $userId";
                break;
            default:
                $response = array('status' => false, 'error' => 'Please select action');
                echo json_encode($response);
                exit();
        }

        if (!mysqli_query($con, $query)) {
            $response = array('status' => false, 'error' => 'Failed to apply action');
            echo json_encode($response);
            exit();
        }
    }

    $response = array('status' => true, 'error' => null, 'action' => $action, 'userIds' => $selectedUserIds);
    echo json_encode($response);
} else {
    $response = array('status' => false, 'error' => 'Please select at least one user');
    echo json_encode($response);
}
