(function ($) {

    'use strict';

    // Gets the registration form
    const $form = $("#signup-form");

    // When you submit your registration form
    $form.on('submit', function (e) {
        createAccount(e);
    });

    // Function to create your account
    const createAccount = (e) => {
        e.preventDefault();

        // Gets values for registration
        const $pseudo = $("#pseudo-input").val();
        const $password = $("#password-input").val();

        // Request to the REST API to add your registration
        $.ajax({
            url: `https://greenvelvet.alwaysdata.net/kwick/api/signup/${$pseudo}/${$password}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then((response) => {
                // Success message before redirection
                if (response.result.status !== 'failure') {
                    $('#status') && $('#status').remove();
                    $('#signup-form').append(`<p id="status">Succès, redirection vers l'écran de connexion ...</p>`);
                    // Redirect to the login form
                    setTimeout(function () {
                        document.location.href = "../public/login.html";
                    }, 2000);
                } else {
                    $('#status') && $('#status').remove();
                    $('#signup-form').append(`<p id="status" class="fail">Ce compte existe déja ...</p>`);
                }
            })
            // Errors
            .catch((error) => {
                console.error(error);
            })
    }

})(jQuery);