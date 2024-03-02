$(document).ready(function() {
    function clearForm() {
        $('input[name=first_name]').val('');
        $('input[name=last_name]').val('');
        $('#customSwitch1').prop('checked', false);
        $('#role').val('-Please-select-');
    }

    $('#addUsers').submit(function(e) {
        e.preventDefault();

        var formData = {
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
            encode: true
        })
            .done(function (data) {
                if (data.status) {
                    $('#addUserModal').modal('hide');
                    clearForm();
                }
            })
            .error(function (data) {
                $('#errorMessage').removeClass('d-none');
                $('#errorMessage').text(data.error.message);
            });
    });

    $('#myTable').on('click', 'button[data-target="#deleteUserModal"]', function(){
        var userName = $(this).data('user-name');
        $('#deleteUserModal .modal-body p').text('Are you sure you want to delete ' + userName + '?');
        $('#deleteUserModal #delete_id').val($(this).data('user-id'));
    });

    $('#deleteUsers').on('submit', function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '../Controller/deleteUser.php',
            data: $(this).serialize(),
            dataType: 'json',
            encode: true
        })
            .done(function (data) {
                if (data.status) {
                    $('#deleteUserModal').modal('hide');
                    $('#deleteUserModal #delete_id').val('');
                }
            })
            .error(function (data) {
                $('#errorMessage').removeClass('d-none');
                $('#errorMessage').text(data.error.message);
            });
    });
});