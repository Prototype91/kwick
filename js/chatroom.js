(function ($) {

    'use strict';

    const user_data = JSON.parse(sessionStorage.getItem('chatroom'));
    const $pseudo = $('#pseudo');
    const $messages = $('#messages-section');
    const $logged_users = $('#logged-users');

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${user_data.token}`,
        method: 'GET',
        dataType: 'jsonp'
    })
        .then((response) => {
            console.log('hjghjghj', response.result.user);
            const users = response.result.user;
            for(let i = 0; i < users.length; i++) {
                $logged_users.append(`
                <p>${users[i]}</p>
                `);
            }

        })
        .catch((error) => {
            console.log(error);
        })

    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${user_data.token}/0`,
        method: 'GET',
        dataType: 'jsonp'
    })
        .then((response) => {
            const talk_list = response.result.talk;
            const pseudo = user_data.pseudo;
            const id = user_data.id;
            const token = user_data.token
            console.log(user_data);

            for (let i = 0; i < talk_list.length; i++) {
                console.log(talk_list[i].content);
                const msg = talk_list[i].content;
                const user = talk_list[i].user_name;
                $messages.append(`
                <p>${user} - ${msg}</p>
                `);
            }

            $pseudo.append(pseudo);
            

            console.log(response);

        })
        .catch((error) => {
            console.log(error);
        })

})(jQuery);