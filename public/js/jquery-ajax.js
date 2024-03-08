$(document).ready(function() {
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
            '<td>' + userData.role + '</td>' +
            '<td style="vertical-align: middle; text-align: center">' +
            '<div class="d-flex justify-content-center">' +
            (userData.status == 1 ? '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: green;"></div>' :
                '<div style="width: 20px; height: 20px; border-radius: 50%; background-color: rgb(128,128,128);"></div>') +
            '</div>' +
            '</td>' +
            '<td>' +
            '<div class="d-flex justify-content-center">' +
            '<div class="btn-group text-center">' +
            '<button type="button" data-target="#updateUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.name + '" data-status="' + userData.status + '" class="btn btn-outline-dark" style="font-size: 0.7rem" data-toggle="modal">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">' +
            '<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/></svg>' +
            '</button>' +
            '<button type="button" data-target="#deleteUserModal" data-user-id="' + userData.id + '" data-user-name="' + userData.name + '" class="btn btn-outline-dark" style="font-size: 0.6rem" data-toggle="modal">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">' +
            '<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>' +
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

        if (formData.first_name == '' || formData.last_name == '' || formData.role == '-Please-select-') {
            $('#errorMessage').removeClass('d-none');
        } else {
            $('#errorMessage').addClass('d-none');
        }

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
                }
            }
        })
    });

    $('#myTable').on('click', 'button[data-target="#deleteUserModal"]', function () {
        var userName = $(this).data('user-name');
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
                }
            }
        });
    });


    $('#myTable').on('click', 'button[data-target="#updateUserModal"]', function () {
        let row = $(this).closest('tr');
        $('#updateUserModal #update_id').val($(this).data('user-id'));
        let fullName = row.find('td:eq(1)').text().trim().split(' ');
        $('#updateUserModal input[name=first_name]').val(fullName[0]);
        $('#updateUserModal input[name=last_name]').val(fullName[1]);
        let status = $(this).data('status');
        $('#updateUserModal #customSwitch2').prop('checked', status == 1);
        $('#updateUserModal #role').val(row.find('td:eq(2)').text().trim());
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
                }
            }
        });
    });

    function updateCheckboxes() {
        let isChecked = $('#checkAll').prop('checked');
        $('input[name = "users[]"]').prop('checked', isChecked);
    }

    function bindCheckboxEvents() {
        $('input[name="users[]"]').change(function () {
            let anyUnchecked = $('input[name="users[]"]:not(:checked)').length > 0;
            $('#checkAll').prop('checked', !anyUnchecked);
        });
        $('#checkAll').change(function () {
            updateCheckboxes();
        });
    }

    $(document).on('click', '#ok', function(e) {
        e.preventDefault();
        let action = $(this).siblings('.setStatus').val();
        let userIds = $('input[name="users[]"]:checked').map(function(){
            return $(this).closest('tr').find('button[data-target="#deleteUserModal"]').data('user-id');
        }).get();

        if (userIds.length === 0) {
            $('#userWarning').removeClass('d-none');
        } else {
            $('#userWarning').addClass('d-none');
        }

        if (action === '-Please-select-') {
            $('#actionWarning').removeClass('d-none');
        } else {
            $('#actionWarning').addClass('d-none');
        }

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
                    url: 'Controller/action.php',
                    data: formData,
                    dataType: 'json',
                    encode: true,
                    success: function () {
                        $('.setStatus').val('-Please-select-');
                        $('#checkAll').prop('checked', false);
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
                url: 'Controller/action.php',
                data: formData,
                dataType: 'json',
                encode: true,
                success: function () {
                    $('.setStatus').val('-Please-select-');
                    $('#checkAll').prop('checked', false);
                }
            });
        }
    });
})