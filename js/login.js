(function ($) {

    'use strict';

    const SESSION_STORAGE_KEY = '5231303chatkey02186964';

    // Gets the login form
    const $form = $("#login-form");

    // When you submit the login form
    $form.on('submit', event => login(event));

    // Function to login
    const login = event => {
        event.preventDefault();

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
            .then(response => {
                if (response.result.status !== 'failure') {
                    // Creates an object to put it into the session storage
                    const user_data = {
                        pseudo: $pseudo,
                        id: response.result.id,
                        token: response.result.token
                    };
                    // Sets the session storage
                    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user_data));

                    // Deletes the error message if present
                    $('#status') && $('#status').remove();
                    // Success message before redirection
                    $('#login').append(`<p id="status" class="success">Succès, redirection en cours ...</p>`);

                    // Redirects to the chatroom
                    setTimeout(() => {
                        window.location.href = '../private/chatroom.html';
                    }, 2000);
                } else {
                    // Error message for the user
                    $('#status') && $('#status').remove();
                    $('#login').append(`<p id="status" class="fail">Email ou mot de passe invalide ...</p>`);
                }
            })
            // Errors
            .catch(error => {
                console.error(error);
            })
    }

})(jQuery);