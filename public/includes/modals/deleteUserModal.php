<div id="deleteUserModal" class="modal fade">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Delete Confirmation</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <div id="deleteMessage" class="alert alert-danger d-none"></div>
                <p>Are you sure you want to delete <?= $user['first_name'] . ' ' . $user['last_name'];?></p>
            </div>
            <input type="hidden" id="delete_id">
            <div class="modal-footer">
                <form action="../../Controller/deleteUser.php" id="deleteUsers" method="post">
                    <input type="hidden" id="delete_id" name="user_id">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="submit" class="btn btn-danger" value="Delete">
                </form>
            </div>
        </div>
    </div>
</div>
