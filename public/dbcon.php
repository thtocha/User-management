<?php
$con = mysqli_connect("db","root","root","UserManagement");

if(!$con){
    die('Connection Failed'. mysqli_connect_error());
}