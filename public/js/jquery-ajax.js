$(document).ready(function() {
    function bindCheckboxEvents() {
        $('input[name="users[]"]').change(function () {
            let anyUnchecked = $('input[name="users[]"]:not(:checked)').length > 0;
            $('#checkAll').prop('checked', !anyUnchecked);
        });
        $('#checkAll').change(function () {
            updateCheckboxes();
        });
    }
    bindCheckboxEvents();

    $(document).on('click', '.addUpdateAction', function () {
        let userData = {
            user_id: null,
            first_name: null,
            last_name: null,
            status: null,
            role: null
        };

        const modal = $('#userModal');
        const modalTitle = $('#userModalLabel');
        const submitBtn = $('#userModalSubmit');
        const form = $('#userForm');

        modalTitle.text('Add User');
        submitBtn.text('Add');
        form.attr('action', '../Controller/addUser.php');

        let row = $(this).closest('tr.userRow');

        if (row.data('user-id')) {
            modalTitle.text('Update User');
            submitBtn.text('Update');
            form.attr('action', '../Controller/updateUser.php');
            userData = {
                user_id: row.data('user-id'),
                first_name: row.data('user-name').split(' ')[0],
                last_name: row.data('user-name').split(' ')[1],
                status: row.data('status'),
                role: row.data('user-role'),
            };
        }

        modal.find('#user_id').val(userData.user_id);
        modal.find('#first_name').val(userData.first_name);
        modal.find('#last_name').val(userData.last_name);
        modal.find('#status').prop('checked', userData.status == 1);
        modal.find('#role').val(userData.role);

        modal.modal('show');
    });

    $('#userForm').on('submit', function (e) {
        e.preventDefault();
        const formData = {
            first_name: $('#first_name').val(),
            last_name: $('#last_name').val(),
            status: $('#status').prop('checked') ? 1 : 0,
            role: $('#role').val(),
            user_id: $('#user_id').val()
        };

        const url = $(this).attr('action');

        $.ajax({
            type: "POST",
            url: url,
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (data) {
                if (data.status) {
                    $('#userModal').modal('hide');

                    formData.user_id ? updateTableRow(data.userData) : addUser(data.userData);

                    $('#errorMessage').addClass('d-none');
                    $('input[name="users[]"]').prop('checked', false);
                    updateCheckboxes();

                    if ($('#myTable tbody tr').length > 0) {
                        $('#noUsersFound').addClass('d-none');
                    }
                } else {
                    $('#errorMessage').removeClass('d-none');
                    $('#errorMessage').text(data.error.message);
                }
            },
        });
    });
    function addUser(userData) {
        let row = '<tr class="userRow" data-user-id="' + userData.user_id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" data-status="' + userData.status + '" data-user-role="' + userData.role + '">' +
            '<td><input type="checkbox" name="users[]" data-user-id="' + userData.user_id + '"></td>' +
            '<td>' + userData.first_name + ' ' + userData.last_name + '</td>' +
            '<td>' +
            (userData.role == 1 ? '<div>Admin</div>' : '<div>User</div>') +
            '</td>' +
            '<td>' +
            '<div class="d-flex justify-content-center">' +
            (userData.status == 1 ? '<div class="active"></div>' : '<div class="notActive"></div>') +
            '</div>' +
            '</td>' +
            '<td>' +
            '<div class="d-flex justify-content-center">' +
            '<div class="btn-group text-center">' +
            '<button type="button" data-target="#updateUserModal" class="btn btn-outline-dark addUpdateAction" data-toggle="modal">' +
            '<i class="bi bi-pencil"></i>' +
            '</button>' +
            '<button type="button" data-target="#deleteUsersModal" class="btn btn-outline-dark" data-toggle="modal">' +
            '<i class="bi bi-trash"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>';
        $('#myTable tbody').append(row);

        bindCheckboxEvents();
    }


    function updateTableRow(userData) {
        let oldRow = $('#myTable tbody tr.userRow').filter(function () {
            return $(this).data('user-id') == userData.user_id;
        });
        let newRow = $('<tr class="userRow" data-user-id="' + userData.user_id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" data-status="' + userData.status + '" data-user-role="' + userData.role + '">')
            .append($('<td>').html('<input type="checkbox" name="users[]" data-user-id="' + userData.user_id + '">'))
            .append($('<td>').text(userData.first_name + ' ' + userData.last_name))
            .append($('<td>')
                .append((userData.role == 1 ? $('<div>Admin</div>') : $('<div>User</div>')))
            )
            .append($('<td>')
                .append($('<div class="d-flex justify-content-center">')
                    .append((userData.status == 1 ? $('<div class="active"></div>') : $('<div class="notActive"></div>')))
                )
            )
            .append($('<td>')
                .append($('<div class="d-flex justify-content-center">')
                    .append($('<div class="btn-group text-center">')
                        .append($('<button type="button" data-target="#updateUserModal" class="btn btn-outline-dark addUpdateAction" data-toggle="modal">')
                            .append($('<i class="bi bi-pencil"></i>'))
                        )
                        .append($('<button type="button" data-target="#deleteUsersModal" class="btn btn-outline-dark" data-toggle="modal">')
                            .append($('<i class="bi bi-trash"></i>'))
                        )
                    )
                )
            );
        oldRow.replaceWith(newRow);
        bindCheckboxEvents();
    }
    function updateCheckboxes() {
        let isChecked = $('#checkAll').prop('checked');
        $('input[name = "users[]"]').prop('checked', isChecked);
    }

    $('#myTable').on('click', 'button[data-target="#deleteUsersModal"]', function () {
        let userName = $(this).closest('tr.userRow').data('user-name');
        let id = ($(this).closest('tr.userRow').data('user-id'));
        manageUsers('delete', [id], userName)
    });

    $(document).on('click', '#ok',function(e) {
        e.preventDefault();
        let action = $(this).siblings('.setStatus').val();
        let userIds = $('input[name="users[]"]:checked').map(function(){
            return $(this).closest('tr.userRow').data('user-id');
        }).get();
        let userName = $('input[name="users[]"]:checked').map(function(){
            return $(this).closest('tr.userRow').data('user-name');
        }).get();
        manageUsers(action, userIds, userName);
    });

    function manageUsers(action, userIds, name) {
        if (action === 'delete') {
            let userMessage = userIds.length === 1 ? name : userIds.length + ' users';
            $('#deleteUsersModal .modal-body p').text('Are you sure you want to delete ' + userMessage + ' ?');
            $('#deleteUsersModal').modal('show');
            $('#deleteUsers').on('submit', function (e) {
                e.preventDefault();
                groupAction(action, userIds);
                $('#deleteUsersModal').modal('hide');
            })
        } else {
            groupAction(action, userIds);
        }
    }

    function groupAction(action, userIds) {
        let formData = {
            action: action,
            userIds: userIds
        };
        $.ajax({
            type: 'POST',
            url: '../Controller/action.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (data) {
                if (data.status) {
                    data.userIds.forEach(function(userId) {
                        let row = $('#myTable tbody tr').filter(function () {
                            return $(this).closest('tr.userRow').data('user-id') == userId;
                        });
                        if (action === 'delete') {
                            row.remove();
                        } else {
                            row.data('status', data.action == 'active' ? 1 : 0);
                            row.find('td:eq(3)').html('<div class="d-flex justify-content-center">' + (data.action == 'active' ? '<div class="active"></div>' : '<div class="notActive"></div>') + '</div>');
                        }

                    });
                    formData.userIds = [];
                    if ($('#myTable tbody tr.userRow').length == 0) {
                        $('#noUsersFound').removeClass('d-none');
                    }
                    $('#deleteUsersModal').on('hidden.bs.modal', function () {
                        $('#deleteUsers').off('submit');
                    });
                    $('input[name="users[]"]').prop('checked', false);
                    $('.setStatus').val('-Please-select-');
                    $('#checkAll').prop('checked', false);
                    updateCheckboxes();
                    $('#actionWarning').addClass('d-none');
                } else {
                    $('#actionWarning').text(data.error).removeClass('d-none');

                }
            }
        });
    }
})