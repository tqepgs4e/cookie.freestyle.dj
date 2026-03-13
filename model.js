const model = {
    send: function(authToken, conversation) {
        return fetch(
            "https://smart-cookie-gateway-production.up.railway.app/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + authToken
                },
                body: JSON.stringify({
                    msghistory: conversation,
                    model: "openai/gpt-oss-120b",
                })
            }
        ).then(response => response.json());
    }
};
