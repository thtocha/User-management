<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <title>User management</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container mt-3">
    <div class="row">
        <div class="col-md-12">
            <h2>Users</h2>
            <?php include "manipulation.php" ?>
            <div id="actionWarning" class="alert alert-danger mt-2 d-none"></div>
            <table id="myTable" class="table table-bordered mt-3">
                <thead>
                <tr>
                    <th><input type="checkbox" id="checkAll"></th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    <?php include "table.php"; ?>
                </tbody>
            </table>
            <?php include "manipulation.php"; ?>

        </div>
    </div>

</div>
<!--Add Modal-->
<?php include "includes/modals/addUserModal.php"; ?>
<!--Update modal-->
<?php include "includes/modals/updateUserModal.php"; ?>
<!--Delete Modal-->
<?php include "includes/modals/deleteUserModal.php"; ?>
<!--Delete Group Modal-->
<?php include "includes/modals/deleteGroupModal.php"; ?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous">
</script>
<script src="js/jquery-ajax.js"></script>
</body>
</html>