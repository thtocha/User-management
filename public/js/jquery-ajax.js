$(document).ready(function() {
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
                    location.reload();
                }
            })
            .error(function (data) {
                $('#errorMessage').removeClass('d-none');
                $('#errorMessage').text(data.error.message);
            });
    });
});