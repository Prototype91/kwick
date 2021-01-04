(function ($) {

    'use strict';

    // Gets the login form
    const $form = $("#login-form");

    // When you submit the login form
    $form.on('submit', function (e) {
        login(e);
    });

    // Function to login
    const login = (e) => {
        e.preventDefault();

        // Gets values of the form
        const $pseudo = $("#pseudo-input").val();
        const $password = $("#password-input").val();

        // Request to the REST API to login
        $.ajax({
            url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${$pseudo}/${$password}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then((response) => {
                // Creates an object to put it into the session storage
                const user_data = {
                    pseudo: $pseudo,
                    id: response.result.id,
                    token: response.result.token
                }
                // Sets the session storage
                sessionStorage.setItem('chatroom', JSON.stringify(user_data));

                // Redirects to the chatroom
                window.location.href = '../private/chatroom.html';
            })
            // Errors
            .catch((error) => {
                console.log(error);
            })
    }

})(jQuery);