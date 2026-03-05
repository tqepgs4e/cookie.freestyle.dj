const viewModel = {
    _test: "",

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