(function ($) {

    'use strict';

    let user_data = JSON.parse(sessionStorage.getItem('chatroom'));

    console.log(user_data);

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${user_data.token}/0`,
        method: 'GET',
        dataType: 'jsonp'
    })
        .then((response) => {
            console.log(response.result.talk);
        })
        .catch((error) => {
            console.log(error);
        })

})(jQuery);