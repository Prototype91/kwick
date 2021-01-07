(function ($) {

    'use strict';

    const SESSION_STORAGE_KEY = '5231303chatkey02186964';

    // Gets the session storage data for specific requests
    const user_data = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));

    // Gets all html elements needed
    const $pseudo = $('#pseudo');
    const $messages = $('#messages-section');
    const $logged_users = $('#logged-users .tab');
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

            // Displays all 10 last the messages of users
            for (let i = talk_list.length - 10; i < talk_list.length; i++) {
                const msg = talk_list[i].content;
                const user = talk_list[i].user_name;
                const timestamp = talk_list[i].timestamp;

                user_data.pseudo === user ?
                    $messages.append(`
                <li>
                    <div class="message-data align-right">
                        <span class="message-data-time">${convert_timestamp(timestamp)}</span>
                        <span>${user}</span>
                    </div>
                    <div class="message right">
                        ${msg}
                    </div>
                </li>
                `) :
                    $messages.append(`
                <li>
                    <div class="message-data align-left">
                        <span>${user}</span>
                        <span class="message-data-time">${convert_timestamp(timestamp)}</span>
                    </div>
                    <div class="message left">
                        ${msg}
                    </div>
                </li>
                `);
            };
        })
        // Errors
        .catch((error) => {
            console.error(error);
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
                let user = users[i] === user_data.pseudo ?
                    `<div class="tab-content">${users[i]} (moi)</div>` :
                    `<div class="tab-content">${users[i]}</div>`;
                $logged_users.append(user);
            };
        })
        // Errors
        .catch((error) => {
            console.error(error);
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
        // If the message is not empty
        if (message.trim().length) {
            // Request to send the message
            $.ajax({
                url: encodeURI(`http://greenvelvet.alwaysdata.net/kwick/api/say/${user_data.token}/${user_data.id}/${message}`),
                method: 'GET',
                dataType: 'jsonp'
            })
                // Success
                .then((response) => {
                    // Sets your sent message
                    window.location.reload();
                    // Goes to the bottom to see your message
                    window.scrollTo(0, document.body.scrollHeight);
                })
                // Errors
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    // Function to convert timestamp
    const convert_timestamp = (timestamp) => {
        // We set each data
        const date = new Date(timestamp * 1000);

        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + date.getMonth() + 1).slice(-2);
        const year = date.getFullYear();

        const hours = ('0' + date.getHours()).slice(-2);
        const minutes = ('0' + date.getMinutes()).slice(-2);

        // Returns the full converted date
        return `${day}/${month}/${year} à ${hours}h${minutes}`
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
                $logout_button.remove();
                // Logout message
                $('#head-ctn').append(`<p id="status">Déconnexion en cours ...</p>`);
                // Removes the session storage
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
                // Redirect to the homepage
                setTimeout(function () {
                    window.location.href = '../index.html';
                }, 2000);
            })
            // Errors
            .catch((error) => {
                console.error(error);
            })
    })

})(jQuery);