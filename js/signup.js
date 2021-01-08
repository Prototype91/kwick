(function ($) {

    'use strict';

    // Gets the registration form
    const $form = $("#signup-form");

    // When you submit your registration form
    $form.on('submit', event => createAccount(event));

    // Function to create your account
    const createAccount = event => {
        event.preventDefault();

        // Gets values for registration
        const $pseudo = $("#pseudo-input").val();
        const $password = $("#password-input").val();

        // Request to the REST API to add your registration
        $.ajax({
            url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$pseudo}/${$password}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then(response => {
                // Success message before redirection
                if (response.result.status !== 'failure') {
                    $('#status') && $('#status').remove();
                    $('#signup-form').append(`<p id="status" class='success'>Succès, redirection vers l'écran de connexion ...</p>`);
                    // Redirect to the login form
                    setTimeout(() => {
                        document.location.href = "../public/login.html";
                    }, 2000);
                } else {
                    $('#status') && $('#status').remove();
                    $('#signup-form').append(`<p id="status" class="fail">Ce compte existe déja ...</p>`);
                }
            })
            // Errors
            .catch(error => {
                console.error(error);
            })
    }

})(jQuery);