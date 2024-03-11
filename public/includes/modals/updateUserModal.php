<div id="updateUserModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form id="updateUsers" method="post" action="../../Controller/updateUser.php">
                <div class="modal-body">
                    <div id="updateMessage" class="alert alert-warning d-none"></div>

                    <div class="mb-3">
                        <label for="">First name</label>
                        <input type="text" name="first_name" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="">Last name</label>
                        <input type="text" name="last_name" class="form-control"/>
                    </div>
                    <div class="mb-3">
                        <label for="customSwitch2">Status</label>
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch2">
                            <label class="custom-control-label" for="customSwitch2"></label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="role">Role</label>
                        <div>
                            <select class="custom-select" id="role" style="width: 155px">
                                <option selected>-Please-select-</option>
                                <?php foreach ($roles as $roleId => $roleName): ?>
                                    <option value="<?= $roleId; ?>"><?= $roleName; ?></option>
                                <?php endforeach; ?>
                            </select>
                        </div>
                    </div>
                </div>
                <input type="hidden" id="update_id">
                <div class="modal-footer">
                    <input type="hidden" id="update_id" name="user_id" >
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    </div>
</div>
