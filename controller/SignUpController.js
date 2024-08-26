import { users } from "../db/Db.js";
import UserModel from "../model/UserModel.js";

$(document).ready(function() {
    console.log("jQuery is loaded and the document is ready");

    $('#signUpForm').on('submit', function(event) {
        event.preventDefault();
        console.log("Form submit event triggered");

        let isValid = true;

        // User Name Validation
        const userName = $('#username');
        const userNameHelp = $('#userNameHelp');
        if ($.trim(userName.val()) === '') {
            userNameHelp.text('User Name is required');
            isValid = false;
            console.log("User Name is required");
        } else {
            userNameHelp.text('');
            console.log("User Name is valid");
        }

        // Password Validation
        const password = $('#password');
        const passwordHelp = $('#passwordHelp');
        if ($.trim(password.val()) === '') {
            passwordHelp.text('Password is required');
            isValid = false;
            console.log("Password is required");
        } else if (password.val().length < 6) {
            passwordHelp.text('Password must be at least 6 characters');
            isValid = false;
            console.log("Password must be at least 6 characters");
        } else {
            passwordHelp.text('');
            console.log("Password is valid");
        }

        // Email Validation
        const email = $('#email');
        const emailHelp = $('#emailHelp');
        const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if ($.trim(email.val()) === '') {
            emailHelp.text('Email address is required');
            isValid = false;
            console.log("Email address is required");
        } else if (!emailPattern.test(email.val())) {
            emailHelp.text('Invalid email address');
            isValid = false;
            console.log("Invalid email address");
        } else {
            emailHelp.text('');
            console.log("Email is valid");
        }

        // Phone Number Validation
        const phoneNumber = $('#phone');
        const phoneNoHelp = $('#phoneNoHelp');
        const phonePattern = /^(?:\+94|0)?(?:7[12345678])\d{7}$/;
        if ($.trim(phoneNumber.val()) === '') {
            phoneNoHelp.text('Phone number is required');
            isValid = false;
            console.log("Phone number is required");
        } else if (!phonePattern.test(phoneNumber.val())) {
            phoneNoHelp.text('Invalid phone number');
            isValid = false;
            console.log("Invalid phone number");
        } else {
            phoneNoHelp.text('');
            console.log("Phone number is valid");
        }

        // Submit the form if valid
        if (isValid) {
            /*alert("Successfully registered!!!");*/
            /*const alertDiv = $('<div class="alert alert-success" role="alert">User Registered Successfully!!!</div>');
            $('#signUpForm').append(alertDiv);*/
            const myPopup = new Popup({
                id: "my-popup",
                title: `<p class="success-message">User Registered Successfully!!!</p>`,
                content: `
                    <p class="success-message">Please Log In.</p>
                `,
            });

            const customStyles = `.success-message { color: green; }`;
            $('head').append(`<style>${customStyles}</style>`);

            myPopup.show();

            // Create new user object and push to users array
            let user = new UserModel(userName.val(), password.val(), email.val(), phoneNumber.val());
            users.push(user);
            console.log("User added:", user);
            console.log("Current users array:", users);

            // Clear the input fields
            clearFields();
        } else {
            console.log("Form is not valid");
        }

        function clearFields() {
            $('#username').val('');
            $('#password').val('');
            $('#email').val('');
            $('#phone').val('');
            console.log("Fields cleared");
        }
    });

});
