<?php
require 'dbcon.php';
$query = "SELECT * FROM users";
$query_run = mysqli_query($con, $query);

if (mysqli_num_rows($query_run) > 0) {
    foreach ($query_run as $user) {
        echo '<tr>
                <td><input type="checkbox" name="users[]"></td>
                <td>' . $user['first_name'] . ' ' . $user['last_name'] . '</td>
                <td>' . $user['role'] . '</td>
                <td style="vertical-align: middle; text-align: center">
                    <div class="d-flex justify-content-center">';
        if ($user['status'] == 1) {
            echo '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>';
        } else {
            echo '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>';
        }
        echo '      </div>
                </td>
                <td>
                    <div class="d-flex justify-content-center">
                        <div class="btn-group text-center">
                            <button type="button" data-target="#updateUserModal" class="btn btn-outline-dark" style="font-size: 0.7rem" data-toggle="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                            </button>
                            <button type="button" data-target="#deleteUserModal" data-user-id="' . $user['id'] . '" data-user-name="' . $user['first_name'] . ' ' . $user['last_name'] . '" class="btn btn-outline-dark" style="font-size: 0.6rem" data-toggle="modal">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </td>
            </tr>';
    }
} else {
    echo '<tr><td colspan="5">No users found</td></tr>';
}
