(function ($) {

    'use strict';

    const $form = $("#login-form");

    $form.on('submit', function (e) {
        login(e);
    });

    function login(e) {
        e.preventDefault();
        const $pseudo = $("#pseudo-input").val();
        const $password = $("#password-input").val();

        if ($pseudo.length > 0 && $password.length > 0) {
            console.log('ok');
            $.ajax({
                url: `http://greenvelvet.alwaysdata.net/kwick/api/login/${$pseudo}/${$password}`,
                method: 'GET',
                dataType: 'jsonp'
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

})(jQuery);