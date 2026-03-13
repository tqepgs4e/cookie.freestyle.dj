const viewModel = {
    _test: "",
    _conversation: [

    ],

    El:{
        chat: document.querySelector('#chat'),
        input: document.querySelector('#input'),
        auth: document.querySelector('#auth'),
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

    auth: {
        open: function() {viewModel.El.auth.showModal();},
        close: function() {viewModel.El.auth.close();}
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
            this.El.chat.scrollTo({
                top: this.El.chat.scrollHeight,
                behavior: 'smooth'
            });
        }
    },

    unMessage: function() {
        this._conversation.pop();
        document.getElementById("chat").lastElementChild?.remove();
    },

    send: function() {
        const authToken = document.getElementById("apikey").value;
        const inputMessage = document.getElementById("input").value;

        if(!inputMessage.trim()) {
            console.warn('Input message is empty. Please enter a message before sending.');
            return;
        }
        if(!authToken.trim()) {
            console.warn('API key is empty. Please enter your API key before sending a message.');
            viewModel.auth.open();
            return;
        }

        this.El.input.value = "";
        this.addMessage({"role":"user","content":inputMessage})
        
        model.send(authToken, this.conversation)
            .then(data => {
                if (data.detail == "Unauthorized") throw new Error(data?.error || "Unauthorized access. Please check your API key.");
                viewModel.addMessage({"role":"assistant","content":data.response})
            })
            .catch(error => {
                viewModel.unMessage();
                viewModel.auth.open();
                console.error('Error fetching data:', error);
            });
    }
};

document.getElementById("testButton").addEventListener("click", () => viewModel.send());
