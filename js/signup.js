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
            url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$pseudo}/${$password}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then((response) => {
                // Success message before redirection
                $('#signup-form').append(`<p id="status">Succès, redirection vers l'écran de connexion ...</p>`);
                // Redirect to the login form
                setTimeout(function(){
                    document.location.href = "../public/login.html";
                }, 3000);
            })
            // Errors
            .catch((error) => {
                console.error(error);
            })
    }

})(jQuery);