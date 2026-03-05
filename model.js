const model = {
    send: function(authToken) {
        return fetch(
            "https://smart-cookie-gateway-production.up.railway.app/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + authToken
                },
                body: JSON.stringify({
                    model: "openai/gpt-oss-120b",
                    msghistory: "%5B%7B%22role%22%3A%22user%22%2C%22content%22%3A%22Explain%20why%20fast%20language%20models%20matter.%22%7D%5D"
                })
            }
        ).then(response => response.json());
    }
};
