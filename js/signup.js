(function ($) {

    'use strict';

    const token = "7edd4c1c31038908d39c7227bd4269b8";

    const $form = $("#signup-form");

    $form.on('submit', function (e) {
        createAccount(e);
    });

    function createAccount(e) {
        e.preventDefault();
        const $pseudo = $("#pseudo-input").val();
        const $password = $("#password-input").val();
        console.log($pseudo.length, $password.length);

        if ($pseudo.length > 0 && $password.length > 0) {
            console.log('ok');
            $.ajax({
                url: `http://greenvelvet.alwaysdata.net/kwick/api/signup/${$pseudo}/${$password}`,
                method: 'GET',
                dataType: 'jsonp'
            })
                .then((response) => {
                    console.log(response);
                    // document.location.href="../login.html"; 
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

})(jQuery);