(function ($) {

    'use strict';

    // Gets the session storage data for specific requests
    const user_data = JSON.parse(sessionStorage.getItem('chatroom'));

    // Gets all html elements needed
    const $pseudo = $('#pseudo');
    const $messages = $('#messages-section');
    const $logged_users = $('#logged-users');
    const $send_message_form = $('#send-message-form');
    const $logout_button = $('#logout');

    // Sets the pseudo of the current logged user 
    const pseudo = user_data.pseudo;
    $pseudo.append(pseudo);

    // Request to get all the messages
    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/talk/list/${user_data.token}/0`,
        method: 'GET',
        dataType: 'jsonp'
    })
        // Success
        .then((response) => {
            // Gets all the messages and pseudo of users
            const talk_list = response.result.talk;

            // Displays all the messages of users
            for (let i = 0; i < talk_list.length; i++) {
                const msg = talk_list[i].content;
                const user = talk_list[i].user_name;
                $messages.append(`
                <div class="message-ctn">
                    <p>${user} :</p>
                    <p>"${msg}"</p>
                </div>
                `);
            };
        })
        // Errors
        .catch((error) => {
            console.log(error);
        })

    // Gets all the users logged
    $.ajax({
        url: `http://greenvelvet.alwaysdata.net/kwick/api/user/logged/${user_data.token}`,
        method: 'GET',
        dataType: 'jsonp'
    })
        // Success
        .then((response) => {
            // Gets the users array
            const users = response.result.user;
            // Displays all the users logged
            for (let i = 0; i < users.length; i++) {
                $logged_users.append(`
                <p>${users[i]}</p>
                `);
            };
        })
        // Errors
        .catch((error) => {
            console.log(error);
        })

    // When you click on the sending message button
    $send_message_form.on('submit', function (e) {
        sendMessage(e);
    });

    // Function to send a message
    const sendMessage = (e) => {
        e.preventDefault();
        // Gets the message to send
        const message = $('#textarea-input').val();

        // Request to send the message
        $.ajax({
            url: `http://greenvelvet.alwaysdata.net/kwick/api/say/${user_data.token}/${user_data.id}/${message}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then((response) => {
                console.log(response);
            })
            // Errors
            .catch((error) => {
                console.log(error);
            })
    }

    // When you click to logout
    $logout_button.on('click', (e) => {
        e.preventDefault();

        // Request to logout
        $.ajax({
            url: `http://greenvelvet.alwaysdata.net/kwick/api/logout/${user_data.token}/${user_data.id}`,
            method: 'GET',
            dataType: 'jsonp'
        })
            // Success
            .then((response) => {
                // Redirect to the homepage
                window.location.href = '../index.html';
            })
            // Errors
            .catch((error) => {
                console.log(error);
            })
    })

})(jQuery);