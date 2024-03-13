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
    function clearForm() {
        $('input[name=first_name]').val('');
        $('input[name=last_name]').val('');
        $('#customSwitch1').prop('checked', false);
        $('#role').val('-Please-select-');
    }

    function addUser(userData) {
        let row = '<tr>' +
            '<td><input type="checkbox" name="users[]" data-user-id="' + userData.id + '"></td>' +
            '<td>' + userData.first_name + ' ' + userData.last_name + '</td>' +
            '<td>' +
            (userData.role == 1 ? '<div>Admin</div>' : '<div>User</div>') +
            '</td>' +
            '<td style="vertical-align: middle; text-align: center">' +
            '<div class="d-flex justify-content-center">' +
            (userData.status == 1 ? '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>' :
                '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>') +
            '</div>' +
            '</td>' +
            '<td>' +
            '<div class="d-flex justify-content-center">' +
            '<div class="btn-group text-center">' +
            '<button type="button" data-target="#updateUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" data-status="' + userData.status + '" class="btn btn-outline-dark" data-toggle="modal">' +
            '<i class="bi bi-pencil"></i>' +
            '</button>' +
            '<button type="button" data-target="#deleteUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" class="btn btn-outline-dark" data-toggle="modal">' +
            '<i class="bi bi-trash"></i>' +
            '</button>' +
            '</div>' +
            '</div>' +
            '</td>' +
            '</tr>';
        $('#myTable tbody').append(row);
        bindCheckboxEvents();
    }
    $('#addUsers').submit(function(e) {
        e.preventDefault();
        let formData = {
            first_name: $('input[name=first_name]').val(),
            last_name: $('input[name=last_name]').val(),
            status: $('#customSwitch1').prop('checked') ? 1 : 0,
            role: $('#role').val()
        };

        $.ajax({
            type: 'POST',
            url: '../Controller/addUser.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function(data) {
                if (data.status) {
                    $('#addUserModal').modal('hide');
                    clearForm();
                    addUser(data.userData);
                    $('#errorMessage').addClass('d-none');
                    $('input[name="users[]"]').prop('checked', false);
                    updateCheckboxes();

                    if ($('#myTable tbody tr').length > 0) {
                        $('#noUsersFound').addClass('d-none');
                    }
                } else {
                    $('#errorMessage').text(data.error.message).removeClass('d-none');
                }
            }
        });
    });

    $('#myTable').on('click', 'button[data-target="#deleteUserModal"]', function () {
        let userName = $(this).data('user-name');
        $('#deleteUserModal .modal-body p').text('Are you sure you want to delete ' + userName + '?');
        $('#deleteUserModal #delete_id').val($(this).data('user-id'));
    });

    $('#deleteUsers').on('submit', function (e){
        e.preventDefault();

        let form = $(this);

        $.ajax({
            type: 'POST',
            url: '../Controller/deleteUser.php',
            data: form.serialize(),
            dataType: 'json',
            encode: true,
            success: function (data) {
                if (data.status) {
                    $('#deleteUserModal').modal('hide');
                    $('#deleteUserModal #delete_id').val('');
                    let deletedUserId = data.user.user_id;
                    $('table#myTable tbody tr').filter(function () {
                        return $(this).find('button[data-target="#deleteUserModal"]').data('user-id') == deletedUserId;
                    }).remove();
                    $('input[name="users[]"]').prop('checked', false);
                    updateCheckboxes();
                    if ($('#userTable tbody tr').length > 0) {
                        $('#noUsersFound').addClass('d-none');
                    } else {
                        $('#noUsersFound').removeClass('d-none');
                    }
                } else {
                    $('#deleteUserModal .modal-body #deleteMessage').text(data.error.message).removeClass('d-none');
                }
            }
        });
    });

    function updateTableRow(userData) {
        let oldRow = $('#myTable tbody tr').filter(function () {
            return $(this).find('button[data-target="#updateUserModal"]').data('user-id') == userData.id;
        });

        let newRow = $('<tr>')
            .append($('<td>').html('<input type="checkbox" name="users[]" data-user-id="' + userData.id + '">'))
            .append($('<td>').text(userData.first_name + ' ' + userData.last_name))
            .append($('<td>')
                .append((userData.role == 1 ? $('<div>Admin</div>') : $('<div>User</div>')))
            )
            .append($('<td style="vertical-align: middle; text-align: center">')
                .append($('<div class="d-flex justify-content-center">')
                    .append((userData.status == 1 ? $('<div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>') : $('<div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>')))
                )
            )
            .append($('<td>')
                .append($('<div class="d-flex justify-content-center">')
                    .append($('<div class="btn-group text-center">')
                        .append($('<button type="button" data-target="#updateUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" data-status="' + userData.status + '" class="btn btn-outline-dark" data-toggle="modal">')
                            .append($('<i class="bi bi-pencil"></i>'))
                        )
                        .append($('<button type="button" data-target="#deleteUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.first_name + ' ' + userData.last_name + '" data-status="' + userData.status + '" class="btn btn-outline-dark" data-toggle="modal">')
                            .append($('<i class="bi bi-trash"></i>'))
                        )
                    )
                )
            );

        oldRow.replaceWith(newRow);
        bindCheckboxEvents();
    }

    $('#myTable').on('click', 'button[data-target="#updateUserModal"]', function () {
        let row = $(this).closest('tr');
        $('#updateUserModal #update_id').val($(this).data('user-id'));
        let fullName = row.find('td:eq(1)').text().trim().split(' ');
        $('#updateUserModal input[name=first_name]').val(fullName[0]);
        $('#updateUserModal input[name=last_name]').val(fullName[1]);
        let status = $(this).data('status');
        $('#updateUserModal #customSwitch2').prop('checked', status == 1);
        let roleText = row.find('td:eq(2)').text().trim();
        let roleId = roleText == 'Admin' ? 1 : 2;
        $('#updateUserModal #role').val(roleId);
    });

    $('#updateUsers').submit(function (e) {
        e.preventDefault();

        let formData = {
            first_name: $('#updateUserModal input[name=first_name]').val(),
            last_name: $('#updateUserModal input[name=last_name]').val(),
            status: $('#updateUserModal #customSwitch2').prop('checked') ? 1 : 0,
            role: $('#updateUserModal #role').val(),
            user_id: $('#update_id').val()
        };

        $.ajax({
            type: 'POST',
            url: '../Controller/updateUser.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (data) {
                if (data.status) {
                    $('#updateUserModal').modal('hide');
                    clearForm();
                    updateTableRow(data.userData);
                    $('#updateMessage').addClass('d-none');
                    $('input[name="users[]"]').prop('checked', false);
                    updateCheckboxes();
                } else {
                    $('#updateMessage').text(data.error.message).removeClass('d-none');
                }
            }
        });
    });

    function updateCheckboxes() {
        let isChecked = $('#checkAll').prop('checked');
        $('input[name = "users[]"]').prop('checked', isChecked);
    }

    $(document).on('click', '#ok',function(e) {
        e.preventDefault();
        let action = $(this).siblings('.setStatus').val();
        let userIds = $('input[name="users[]"]:checked').map(function(){
            return $(this).closest('tr').find('button[data-target="#deleteUserModal"]').data('user-id');
        }).get();

        if (action === 'delete') {
            $('#selectedUsersCount').text(userIds.length);
            $('#confirmDeleteModal').modal('show');
            $('#confirmDeleteButton').click(function() {
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
                                    return $(this).find('button[data-target="#deleteUserModal"]').data('user-id') == userId;
                                });

                                row.remove();
                            });

                            if ($('#userTable tbody tr').length > 0) {
                                $('#noUsersFound').addClass('d-none');
                            } else {
                                $('#noUsersFound').removeClass('d-none');
                            }
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
                $('#confirmDeleteModal').modal('hide');
            });
        } else {
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
                                return $(this).find('button[data-target="#deleteUserModal"]').data('user-id') == userId;
                            });
                            let newStatus = data.action === 'active' ? 1 : 0;
                            row.find('td:eq(3)').html('<div class="d-flex justify-content-center">' + (newStatus == 1 ? '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>' : '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>') + '</div>');

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
    });
})