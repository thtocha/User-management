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
            <div class="block">
                <div class="block-header">
                    <h2>Users</h2>
                    <div class="block-header-body d-flex">
                        <button class="btn btn-primary" id="add" data-toggle="modal" data-target="#addUserModal">Add</button>
                        <select class="custom-select" id="status" style="width: 155px">
                            <option selected>-Please-select-</option>
                            <option value="active">Set active</option>
                            <option value="notActive">Set not active</option>
                            <option value="delete">Delete</option>
                        </select>
                        <button class="btn btn-primary" id="ok">Ok</button>
                    </div>
                </div>
            </div>
            <div class="block-body">
                <table id="myTable" class="table table-bordered mt-3">
                    <thead>
                    <tr>
                        <th><input type="checkbox"></th>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php
                    require 'dbcon.php';
                    $query = "SELECT * FROM users";
                    $query_run = mysqli_query($con, $query);

                    if(mysqli_num_rows($query_run) > 0)
                    {
                        foreach($query_run as $user)
                        {
                            ?>
                            <tr>
                                <td><input type="checkbox"></td>
                                <td><?= $user['first_name'] . ' ' . $user['last_name']?></td>
                                <td><?= $user['role'] ?></td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <?php if ($user['status'] == 1): ?>
                                            <div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>
                                        <?php else:?>
                                            <div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>
                                        <?php endif;?>
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-center">
                                        <div class="btn-group text-center">
                                            <button type="button" class="btn btn-outline-dark" style="font-size: 0.7rem" data-toggle="modal" data-target="#updateUserModal">Edit</button>
                                            <button type="button" class="btn btn-outline-dark" style="font-size: 0.6rem" data-toggle="modal" data-target="#deleteUserModal">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <?php
                        }
                    }
                    ?>
                    </tbody>
                </table>
            </div>
            <div class="block-footer">
                <div class="block-header-body d-flex">
                    <button class="btn btn-primary" id="add" data-toggle="modal" data-target="#addUserModal">Add</button>
                    <select class="custom-select" id="status" style="width: 155px">
                        <option selected>-Please-select-</option>
                        <option value="active">Set active</option>
                        <option value="notActive">Set not active</option>
                        <option value="delete">Delete</option>
                    </select>
                    <button class="btn btn-primary" id="ok">Ok</button>
                </div>
            </div>
        </div>
    </div>

</div>

<!--Add Modal-->
<div class="modal fade" id="addUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="addUsers">
                    <div id="errorMessage" class="alert alert-warning d-none"></div>

                    <div class="mb-3">
                        <label for="">First name</label>
                        <input type="text" name="first_name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="">Last name</label>
                        <input type="text" name="last_name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1">Status</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="role">Role</label>
                        <div>
                            <select class="custom-select" id="role" style="width: 155px">
                                <option selected>-Please-select-</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Add</button>
            </div>
        </div>
    </div>
</div>

<!--Update modal-->
<div class="modal fade" id="updateUserModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="updateUsers">
                    <div id="errorMessage" class="alert alert-warning d-none"></div>

                    <div class="mb-3">
                        <label for="">First name</label>
                        <input type="text" name="first_name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="">Last name</label>
                        <input type="text" name="last_name" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch2">
                            <label class="custom-control-label" for="customSwitch2">Status</label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="role">Role</label>
                        <div>
                            <select class="custom-select" id="role" style="width: 155px">
                                <option selected>-Please-select-</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Update</button>
            </div>
        </div>
    </div>
</div>

<!--Delete Modal-->
<div id="deleteUserModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Delete Confirmation</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <p>Are you sure you want to delete <?= $user['first_name'] . ' ' . $user['last_name']?></p>
            </div>
            <input type="hidden" id="delete_id">
            <div class="modal-footer">
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                <input type="submit" class="btn btn-danger" value="Delete">
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"></script>
</body>
</html>