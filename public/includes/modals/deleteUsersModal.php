<div id="deleteUsersModal" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Delete Confirmation</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">
                <div id="deleteMessage" class="alert alert-danger d-none"></div>
                <p class="askDelete"></p>
            </div>
            <div class="modal-footer">
                <form id="deleteUsers" method="post">
                    <input type="hidden" id="delete_id" name="user_id">
                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel">
                    <input type="submit" class="btn btn-danger" id="confirmDelete" value="Delete">
                </form>
            </div>
        </div>
    </div>
</div>
