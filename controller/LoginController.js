import { users } from "../db/Db.js";

$(document).ready(function() {
    console.log("jQuery is loaded and the document is ready");

    $('#logInBtn').on('click', function(event) {
        event.preventDefault();
        console.log("Log In button clicked");

        const userName = $('#login-userName').val().trim();
        const password = $('#login-password').val().trim();

        if (userName === '' || password === '') {
            showAlert("Please enter both username and password.", "danger");
            return;
        }

        const user = users.find(user => user.userName === userName && user.password === password);

        if (user) {
            console.log("User found:", user);
            $('#header').css({display:'block'});
            $('#customer-section').css({display:'block'});
            $('#login-section').css({display:'none'});
            $('#sign-up-section').css({display:'none'});
            $('#item-section').css({display:'none'});
            $('#order-section').css({display:'none'});
        } else {
            showAlert("Incorrect username or password.", "danger");
        }
    });

    function showAlert(message, type) {
        const alertBox = $(`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`);
        $('.form').prepend(alertBox);

        setTimeout(() => {
            alertBox.alert('close');
        }, 3000);
    }
});

