<?php
require 'dbcon.php';
require 'config.php';
$query = "SELECT * FROM users";
$query_run = mysqli_query($con, $query);

if (mysqli_num_rows($query_run) > 0) {
    foreach ($query_run as $user) {
        echo '<tr>
                <td><input type="checkbox" name="users[]"></td>
                <td>' . $user['first_name'] . ' ' . $user['last_name'] . '</td>
                <td>' . $roles[$user['role']] . '</td>
                <td>
                    <div class="d-flex justify-content-center">';
        if ($user['status'] == 1) {
            echo '<div class="active"></div>';
        } else {
            echo '<div class="notActive"></div>';
        }
        echo '      </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <div class="btn-group text-center">
                            <button type="button" data-target="#updateUserModal" data-user-id="' . $user['id'] . '" data-user-name="' . $user['first_name'] . ' ' . $user['last_name'] . '" data-status="' . $user['status'] . '" data-user-role="' . $user['role'] . '" class="btn btn-outline-dark"  data-toggle="modal">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button type="button" data-target="#deleteUserModal" data-user-id="' . $user['id'] . '" data-user-name="' . $user['first_name'] . ' ' . $user['last_name'] . '" class="btn btn-outline-dark" data-toggle="modal">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>';
    }
} else {
    echo '<tr><td class="" id="noUsersFound" colspan="5">No users found</td></tr>';
}