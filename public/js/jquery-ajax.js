$(document).ready(function() {
    bindCheckboxEvents();
    function clearForm() {
        $('input[name=first_name]').val('');
        $('input[name=last_name]').val('');
        $('#customSwitch1').prop('checked', false);
        $('#role').val('-Please-select-');
    }

    function refreshTable() {
        $.ajax({
            type: 'GET',
            url: 'table.php',
            dataType: 'html',
            success: function (data) {
                $('#myTable tbody').html(data);
                bindCheckboxEvents();
            },
            error: function (error) {
                console.log('Error refreshing table:', error);
            }
        });
    }
    $('#addUsers').submit(function (e) {
        e.preventDefault();

        let formData = {
            first_name: $('input[name=first_name]').val(),
            last_name: $('input[name=last_name]').val(),
            status: $('#customSwitch1').prop('checked') ? 1 : 0,
            role: $('#role').val()
        };

        if (formData.first_name == '' || formData.last_name == '' || formData.role == '-Please-select-') {
            $('#errorMessage').removeClass('d-none');
            setTimeout(function () {
                $('#errorMessage').addClass('d-none');
            }, 4000)
        }
        $.ajax({
            type: 'POST',
            url: '../Controller/addUser.php',
            data: formData,
            dataType: 'json',
            encode: true,
            success: function (data) {
                if (data.status) {
                    $('#addUserModal').modal('hide');
                    clearForm();
                    refreshTable();
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
                    refreshTable();
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
                    refreshTable();
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
            $('#userWarning').show();
            setTimeout(function () {
                $('#userWarning').hide();
            }, 4000);
            return;
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
                        refreshTable();
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
                    refreshTable();
                }
            });
        }
    });
})