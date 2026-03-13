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

    send: function() {
        const authToken = document.getElementById("apikey").value;
        const inputMessage = document.getElementById("input").value;

        this.El.input.value = "";
        this.addMessage({"role":"user","content":inputMessage})
        
        model.send(authToken, this.conversation)
            .then(data => {
                console.log(data);
                viewModel.addMessage({"role":"assistant","content":data.response})
            })
            .catch(error => {
                viewModel.auth.open();
                console.error('Error fetching data:', error);
            });
    }
};

document.getElementById("testButton").addEventListener("click", () => viewModel.send());
