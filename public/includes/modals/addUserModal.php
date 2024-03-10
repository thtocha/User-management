<div id="addUserModal" class="modal fade"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="addUsers" method="post" action="../../Controller/addUser.php">
                <div class="modal-body">
                    <div id="errorMessage" class="alert alert-warning d-none"></div>

                    <div class="mb-3">
                        <label for="">First name</label>
                        <input type="text" name="first_name" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="">Last name</label>
                        <input type="text" name="last_name" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="customSwitch1">Status</label>
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1"></label>
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
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    </div>
</div>
