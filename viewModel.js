const viewModel = {
    _test: "",
    _conversation: [

    ],

    El:{
        chat: document.querySelector('#chat'),
    },

    get test() {
        return this._test;
    },

    set test(value) {
        this._test = value;
        const element = document.querySelector('#test');
        if (element) {
            element.textContent = value;
        }
    },

    get conversation() {
        return this._conversation;
    },
    
    addMessage: function(message) {
        if (!message || !message.role || !message.content) {
            console.error('Invalid message format (must contain a role and a content field):', message);
            return;
        }

        this._conversation.push(message);
        if (this.El.chat) {
            const msgEl = `<div class="${message.role === 'user' ? 'usermessage' : 'chatbotmessage'}">${message.content}</div>`;
            this.El.chat.insertAdjacentHTML('beforeend', msgEl);
        }
    },

    send: function() {
        const authToken = document.getElementById("apikey").textContent;
        const inputMessage = document.getElementById("input").textContent;
        this.test = "Loading...";
        model.send(authToken, inputMessage)
            .then(data => {
                console.log(data);
                this.test = data.response;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                viewModel.test = "Error: " + error.message;
            });
    }
};

document.getElementById("testButton").addEventListener("click", () => viewModel.send());