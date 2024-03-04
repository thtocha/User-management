<?php
require '../dbcon.php';

if(isset($_POST['action']) && isset($_POST['userIds'])) {
    $action = $_POST['action'];
    $selectedUserIds = $_POST['userIds'];

    foreach ($selectedUserIds as $userId) {
        if (!is_numeric($userId)) {
            continue;
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
                $response = array('status' => false, 'error' => 'Invalid action');
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
    $response = array('status' => false, 'error' => 'Missing required data');
    echo json_encode($response);
}