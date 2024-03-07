<?php
$host = 'db';
$user = 'root';
$pass = 'root';
$db = 'UserManagement';

$con = mysqli_connect($host, $user, $pass, $db);
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}