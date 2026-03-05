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
        const authToken = document.getElementById("test2").textContent;
        model.send(authToken)
            .then(data => {
                console.log(data);
                this.test = data.response;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
};

