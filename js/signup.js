(function ($) {

    'use strict';

    const $form = $("#signup-form");

    $form.on('submit', function(e) {
        createAccount(e);
    });

    function createAccount(e) {
        e.preventDefault();
        const $email = $("#email-input").val();
        const $password = $("#password-input").val();
        console.log($email, $password);

        $.ajax({
            url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$email}/${$password}`,
            method: 'GET',
            dataType: 'jsonp'
        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error);
        })
    }

})(jQuery);