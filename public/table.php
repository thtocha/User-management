<?php
require 'dbcon.php';
require 'config.php';
$query = "SELECT * FROM users";
$query_run = mysqli_query($con, $query);

foreach ($query_run as $user) {
    echo '<tr class="userRow" data-user-id="' . $user['id'] . '" data-user-name="' . $user['first_name'] . ' ' . $user['last_name'] . '" data-status="' . $user['status'] . '" data-user-role="' . $user['role'] . '">
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
                        <button type="button" data-target="#updateUserModal" class="btn btn-outline-dark addUpdateAction"  data-toggle="modal">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button type="button" data-target="#deleteUsersModal" class="btn btn-outline-dark" data-toggle="modal">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </td>
        </tr>';
}
echo '<tr id="noUsersFound"' . (mysqli_num_rows($query_run) > 0 ? ' class="d-none"' : '') . ' ><td colspan="5">No users found</td></tr>';